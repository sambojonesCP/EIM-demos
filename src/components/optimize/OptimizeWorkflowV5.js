import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, RefreshCcw, AlertCircle, Shield, Heart, BookOpen, MessageSquare } from 'lucide-react';

export default function OptimizeWorkflowV5({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [optimizationStatus, setOptimizationStatus] = useState('in-progress');
  const [currentImprovement, setCurrentImprovement] = useState('');
  const [overallScore, setOverallScore] = useState(85); // Example initial score

  const categories = {
    clarity: { icon: BookOpen, color: 'text-blue-500', score: 90 },
    empathy: { icon: Heart, color: 'text-rose-500', score: 85 },
    completeness: { icon: CheckCircle2, color: 'text-green-500', score: 88 },
    compliance: { icon: Shield, color: 'text-purple-500', score: 82 },
  };

  const steps = [
    {
      type: 'clarity',
      title: 'Medical Terminology Simplification',
      currentContent: 'Patient exhibits symptoms consistent with acute rhinosinusitis with associated cervical lymphadenopathy.',
      suggestedImprovement: 'You have inflammation in your sinuses and swollen lymph nodes in your neck.',
      impact: ['Improved patient understanding', 'Better communication', 'Increased engagement'],
      severity: 'medium'
    },
    {
      type: 'empathy',
      title: 'Enhanced Patient-Centered Language',
      currentContent: 'Patient is non-compliant with medication regimen.',
      suggestedImprovement: 'We discussed the challenges you\'re experiencing with following the prescribed medication schedule. Let\'s explore ways to make it more manageable for you.',
      impact: ['Better patient rapport', 'Increased trust', 'Improved adherence'],
      severity: 'high'
    },
    {
      type: 'completeness',
      title: 'Documentation Completeness',
      currentContent: 'Will follow up in 2 weeks.',
      suggestedImprovement: 'Follow-up scheduled for [DATE] at [TIME]. Patient instructed to monitor for fever >101°F, increased pain, or new symptoms. Emergency contact information provided. Current medications reviewed and continued as prescribed.',
      impact: ['Complete documentation', 'Clear follow-up plan', 'Risk mitigation'],
      severity: 'medium'
    },
    {
      type: 'compliance',
      title: 'Regulatory Compliance',
      currentContent: 'Discussed treatment options.',
      suggestedImprovement: 'Conducted shared decision-making discussion regarding treatment options. Reviewed risks, benefits, and alternatives of each option. Patient expressed understanding and chose to proceed with [TREATMENT]. Written materials provided.',
      impact: ['Meets documentation requirements', 'Legal compliance', 'Quality metrics'],
      severity: 'high'
    }
  ];

  // Update currentImprovement when step changes
  React.useEffect(() => {
    setCurrentImprovement(steps[currentStep].suggestedImprovement);
  }, [currentStep]);

  const handleAction = (action) => {
    if (action === 'accept') {
      // Here you would typically save the currentImprovement value
      console.log('Saving improvement:', currentImprovement);
      // Update score simulation
      setOverallScore(prev => Math.min(100, prev + 2));
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOptimizationStatus('completed');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const getSeverityColor = (severity) => {
    const colors = {
      low: 'bg-yellow-400',
      medium: 'bg-orange-400',
      high: 'bg-red-400'
    };
    return colors[severity] || colors.medium;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-cyan-500/20 h-full">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <h2 className="text-lg font-semibold text-gray-900">Note Assistant</h2>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
              <div className={`text-2xl font-semibold ${overallScore >= 90 ? 'text-green-500' : overallScore >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                {overallScore}
              </div>
              <div className="text-sm text-gray-500">Overall Score</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {/* Category Scores */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(categories).map(([key, { icon: Icon, color, score }]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-sm font-medium capitalize">{key}</span>
              </div>
              <div className="mt-2">
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-1 rounded-full ${color.replace('text', 'bg')}`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between text-sm mb-6">
          <div className="text-gray-600">Suggestion {currentStep + 1} of {steps.length}</div>
          <div className="text-cyan-600 font-medium">{Math.round(progress)}% Complete</div>
        </div>

        {/* Main Content Area */}
        <div className="overflow-y-auto max-h-[calc(100vh-380px)]">
          {optimizationStatus === 'in-progress' ? (
            <div className="space-y-6">
              {/* Suggestion Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="mt-1">
                    <div className={`w-6 h-6 rounded-full ${getSeverityColor(steps[currentStep].severity)} flex items-center justify-center`}>
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {steps[currentStep].title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        steps[currentStep].severity === 'high' ? 'bg-red-100 text-red-700' :
                        steps[currentStep].severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {steps[currentStep].severity.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Comparison */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-600 text-sm">{steps[currentStep].currentContent}</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-3 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <div className="bg-white rounded-lg p-4 border border-cyan-100 focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400">
                      <textarea
                        value={currentImprovement}
                        onChange={(e) => setCurrentImprovement(e.target.value)}
                        className="text-gray-800 text-sm w-full resize-none border-0 bg-transparent p-0 focus:ring-0 focus:outline-none"
                        rows={3}
                        placeholder="Edit the suggested improvement..."
                      />
                    </div>
                  </div>

                  {/* Impact Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Impact of this change:</h4>
                    <ul className="space-y-2">
                      {steps[currentStep].impact.map((impact, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    onClick={() => handleAction('skip')}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Skip
                  </button>
                  <button 
                    onClick={() => handleAction('decline')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Keep Original
                  </button>
                  <button 
                    onClick={() => handleAction('accept')}
                    className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors flex items-center"
                  >
                    Accept Improvement
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border-2 border-green-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Optimization Complete!</h2>
              <p className="text-gray-600 text-sm mb-6">
                Your note quality score has improved to {overallScore}
              </p>
              <div className="space-x-3">
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setOptimizationStatus('in-progress');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  <span>Start New Optimization</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center"
                >
                  <span>Return to Summary</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
