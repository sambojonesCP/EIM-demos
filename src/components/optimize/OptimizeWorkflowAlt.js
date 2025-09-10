import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { X, ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, Shield, Heart, BookOpen, MessageSquare } from 'lucide-react';
import './OptimizeWorkflowAlt.css';

// Mock medical terms dictionary - in production this would come from a medical terminology API
const medicalTerms = {
  'SOB': { suggestion: 'shortness of breath', type: 'abbreviation' },
  'pt': { suggestion: 'patient', type: 'abbreviation' },
  'hx': { suggestion: 'history', type: 'abbreviation' },
  'neg': { suggestion: 'negative', type: 'abbreviation' },
  'w/': { suggestion: 'with', type: 'abbreviation' },
};

const suggestionTypes = {
  GRAMMAR: 'grammar',
  MEDICAL_TERM: 'medical_term',
  COMPLETENESS: 'completeness',
  PATIENT_CENTERED: 'patient_centered'
};

export default function OptimizeWorkflowAlt({ onClose, patientNote }) {
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const [overallScore, setOverallScore] = useState(85);
  const [showStats, setShowStats] = useState(true);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: patientNote,
    editable: true,
    onUpdate: ({ editor }) => {
      analyzeMedicalText(editor.getText());
    },
  });

  // Analyze text for various issues
  const analyzeMedicalText = useCallback((text) => {
    const newSuggestions = [];
    let position = 0;

    // Split text into words and analyze each
    const words = text.split(/\s+/);
    words.forEach((word, index) => {
      // Check for medical abbreviations
      if (medicalTerms[word]) {
        newSuggestions.push({
          id: `sugg-${index}`,
          type: suggestionTypes.MEDICAL_TERM,
          text: word,
          suggestion: medicalTerms[word].suggestion,
          position: { start: position, end: position + word.length },
          severity: 'medium'
        });
      }

      // Update position counter
      position += word.length + 1; // +1 for the space
    });

    // Check for section completeness
    const requiredSections = ['HPI', 'Physical Exam', 'Assessment', 'Plan'];
    requiredSections.forEach(section => {
      if (!text.includes(section)) {
        newSuggestions.push({
          id: `section-${section}`,
          type: suggestionTypes.COMPLETENESS,
          text: `Missing ${section} section`,
          suggestion: `Add a ${section} section to ensure complete documentation`,
          severity: 'high'
        });
      }
    });

    setSuggestions(newSuggestions);
  }, []);

  // Effect to analyze initial text
  useEffect(() => {
    if (editor) {
      analyzeMedicalText(editor.getText());
    }
  }, [editor, analyzeMedicalText]);

  // Navigation between suggestions
  const navigateSuggestions = (direction) => {
    if (!activeSuggestion || suggestions.length === 0) return;
    
    const currentIndex = suggestions.findIndex(s => s.id === activeSuggestion.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % suggestions.length
      : (currentIndex - 1 + suggestions.length) % suggestions.length;
    
    setActiveSuggestion(suggestions[newIndex]);
  };

  // Handle suggestion acceptance
  const acceptSuggestion = (suggestion) => {
    if (!editor || !suggestion) return;

    if (suggestion.type === suggestionTypes.MEDICAL_TERM) {
      editor.commands.setTextSelection({
        from: suggestion.position.start,
        to: suggestion.position.end
      });
      editor.commands.insertContent(suggestion.suggestion);
    }

    // Remove the suggestion from the list
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
    setActiveSuggestion(null);
    
    // Update score
    setOverallScore(prev => Math.min(100, prev + 2));
  };

  // Handle suggestion dismissal
  const dismissSuggestion = (suggestionId) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    setActiveSuggestion(null);
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">Note Assistant</h2>
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                <div className={`text-2xl font-semibold ${
                  overallScore >= 90 ? 'text-green-500' : 
                  overallScore >= 70 ? 'text-yellow-500' : 
                  'text-red-500'
                }`}>
                  {overallScore}
                </div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Editor Area */}
        <div className="flex-1 relative">
          <div className="h-full overflow-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <EditorContent editor={editor} className="prose max-w-none" />
            </div>
          </div>

          {/* Suggestion Popups */}
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className={`absolute transform -translate-y-full ${
                suggestion === activeSuggestion ? 'block' : 'hidden'
              }`}
              style={{
                left: suggestion.position?.start ? `${suggestion.position.start}px` : '50%',
                top: suggestion.position?.start ? `${suggestion.position.start}px` : '50%'
              }}
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80">
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    {suggestion.type === suggestionTypes.MEDICAL_TERM && (
                      <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    )}
                    {suggestion.type === suggestionTypes.COMPLETENESS && (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{suggestion.text}</div>
                      <p className="text-sm text-gray-600 mt-1">{suggestion.suggestion}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => acceptSuggestion(suggestion)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => dismissSuggestion(suggestion.id)}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Dismiss
                      </button>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => navigateSuggestions('prev')}
                        className="p-1.5 rounded-full hover:bg-gray-100"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => navigateSuggestions('next')}
                        className="p-1.5 rounded-full hover:bg-gray-100"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Sidebar */}
        {showStats && (
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-4 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Issues Found</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-2xl font-semibold text-red-500">
                      {suggestions.filter(s => s.severity === 'high').length}
                    </div>
                    <div className="text-sm text-gray-600">Critical</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="text-2xl font-semibold text-yellow-500">
                      {suggestions.filter(s => s.severity === 'medium').length}
                    </div>
                    <div className="text-sm text-gray-600">Suggestions</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {Object.entries(suggestionTypes).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {key.toLowerCase().replace('_', ' ')}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {suggestions.filter(s => s.type === value).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
