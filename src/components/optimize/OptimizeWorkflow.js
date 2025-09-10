import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, RefreshCcw } from 'lucide-react';

export default function OptimizeWorkflow({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [optimizationStatus, setOptimizationStatus] = useState('in-progress');
  const [currentImprovement, setCurrentImprovement] = useState('');

  const steps = [
    {
      type: 'opportunity',
      title: 'Increase Patient Involvement in decisions',
      currentContent: 'After reviewing the test results, I have determined that the patient should continue with the current treatment plan.',
      suggestedImprovement: 'After reviewing the test results with you, what are your thoughts on continuing with the current treatment plan? Do you have any concerns or questions about this approach?'
    },
    {
      type: 'opportunity', 
      title: 'Provide more specific follow-up instructions',
      currentContent: 'Follow up as needed.',
      suggestedImprovement: 'Schedule a follow-up appointment in 2 weeks. Call our office immediately if you experience worsening symptoms, fever above 101°F, or any new concerning symptoms. Continue current medications as prescribed.'
    },
    {
      type: 'opportunity',
      title: 'Use plain-language explanations consistently', 
      currentContent: 'Patient presents with acute exacerbation of underlying comorbidities with concurrent metabolic derangements.',
      suggestedImprovement: 'The patient is experiencing a worsening of their existing health conditions, along with some changes in their body chemistry that we are monitoring closely.'
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
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOptimizationStatus('completed');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-cyan-500/20 h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <h2 className="text-lg font-semibold text-gray-900">Optimize Note</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-between text-sm mb-6">
          <div className="text-gray-600">Step {currentStep + 1} of {steps.length}</div>
          <div className="text-cyan-600 font-medium">{Math.round(progress)}% Complete</div>
        </div>

        {/* Main Content Area */}
        <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
          {optimizationStatus === 'in-progress' ? (
            <div className="space-y-6">
              {/* Suggestion Card */}
              <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl border border-cyan-100 p-5">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="mt-1">
                    {steps[currentStep].type === 'opportunity' ? 
                      <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center">
                        <span className="text-sm">💡</span>
                      </div> :
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-sm">📋</span>
                      </div>
                    }
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {steps[currentStep].type === 'opportunity' ? 
                        'Suggested improvement for better patient communication' :
                        'Documentation completeness check'}
                    </p>
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 border-2 border-cyan-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-cyan-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Optimization Complete!</h2>
              <p className="text-gray-600 text-sm mb-6">
                Your note has been enhanced with your selected improvements.
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
