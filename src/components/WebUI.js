import React, { useState } from 'react';
import { ArrowLeft, Mic, Edit3, Copy } from 'lucide-react';
import InsightsV1 from './insights/InsightsV1';
import InsightsV2 from './insights/InsightsV2';
import InsightsV3 from './insights/InsightsV3';
import InsightsV4 from './insights/InsightsV4';
import InsightsV5 from './insights/InsightsV5';
import OptimizeWorkflow from './optimize/OptimizeWorkflow';
import OptimizeWorkflowAlt from './optimize/OptimizeWorkflowAlt';

export default function PatientNoteInterface() {
  const [currentView, setCurrentView] = useState('note');
  const [insightsVersion, setInsightsVersion] = useState(1);
  const [smartReviewStep, setSmartReviewStep] = useState(0);
  
  const [showOptimizeWorkflow, setShowOptimizeWorkflow] = useState(false);
  const [useAltOptimize, setUseAltOptimize] = useState(false);

  // Smart Review workflow items
  const reviewItems = [
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
    },
    {
      type: 'documentation',
      title: 'Did you personally interpret any test results?',
      currentContent: 'Labs reviewed.',
      suggestedImprovement: 'I personally reviewed and interpreted the CBC, CMP, and chest X-ray. The CBC showed mild anemia, CMP was within normal limits, and chest X-ray demonstrated clear lung fields with no acute findings.'
    },
    {
      type: 'documentation',
      title: 'Are there any relevant social determinants of health?',
      currentContent: 'No social issues noted.',
      suggestedImprovement: 'Patient reports stable housing and reliable transportation to appointments. Has good family support system. No financial barriers to medication access identified.'
    },
    {
      type: 'documentation', 
      title: 'Was more than 30 minutes spent documenting critical care?',
      currentContent: 'Critical care provided.',
      suggestedImprovement: 'I spent 45 minutes providing critical care services including: continuous monitoring of vital signs, adjustment of IV medications, coordination with nursing staff, and family communication regarding treatment plan and prognosis.'
    }
  ];

  const copyNote = () => {
    console.log('Copy note clicked');
  };

  const addRecording = () => {
    console.log('Add recording clicked');
  };

  const refineNote = () => {
    console.log('Refine note clicked');
  };

  const handleReviewAction = (action) => {
    console.log(`${action} action for step ${smartReviewStep}`);
    if (smartReviewStep < reviewItems.length - 1) {
      setSmartReviewStep(smartReviewStep + 1);
    } else {
      setCurrentView('note');
    }
  };

  // Get the full note text for the OptimizeWorkflow
  const getFullNote = () => {
    return `Robert Smith, the patient, is a male presenting with syncope during a marathon. They were running a marathon and started when they experienced and lost consciousness towards the end. The patient reports being told they were unconscious for about one to two minutes. Prior to the syncopal episode, they experienced increasing shortness of breath for about a minute and felt dizzy.

There was no additional history obtained.

Review of Systems:
Constitutional Patient reports feeling weak and fatigued prior to syncopal episode. Denies fever, chills, night sweats, or unintentional weight loss.
- Neurological Patient demonstrates intermittent confusion and disorientation to time since arrival.
All other systems reviewed were normal.

Physical Examination:
Vital Signs: Temperature 98.6°F, Blood Pressure 125/78 mmHg, Heart Rate 82 bpm, Respiratory Rate 16/min, Oxygen Saturation 98% on room air
General: Alert and oriented x3, appears comfortable, no acute distress
Cardiovascular: Regular rate and rhythm, no murmurs, rubs, or gallops
Pulmonary: Clear to auscultation bilaterally, no wheezes, rales, or rhonchi
Neurological: Cranial nerves II-XII intact, motor strength 5/5 in all extremities, reflexes 2+ throughout

Assessment and Plan:
1. Syncope (Exercise-induced)
- Likely vasovagal episode triggered by prolonged exertion and dehydration during marathon
- EKG shows normal sinus rhythm with no acute changes
- Cardiac enzymes within normal limits
- Continue IV hydration
- Monitor cardiac rhythm
- Discharge home when stable with cardiology follow-up

2. Dehydration
- Secondary to prolonged exercise with inadequate fluid replacement
- Normal saline bolus administered with improvement in symptoms
- Patient educated on proper hydration during endurance activities`;
  };

  // Note Optimization Screen
  if (currentView === 'smartReview') {
    const currentItem = reviewItems[smartReviewStep];
    const progress = ((smartReviewStep + 1) / reviewItems.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Optimization Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentView('note')} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-medium text-gray-900">Note Optimization</h1>
                <span className="text-sm text-gray-500">({smartReviewStep + 1} of {reviewItems.length})</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-cyan-400 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Review Content */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Step Title */}
            <div className={`p-4 rounded-lg mb-8 ${
              currentItem.type === 'opportunity' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-orange-50 border-l-4 border-orange-400'
            }`}>
              <h3 className={`text-xl font-medium ${
                currentItem.type === 'opportunity' ? 'text-blue-900' : 'text-orange-900'
              }`}>
                {currentItem.type === 'opportunity' ? '🎯' : '📋'} {currentItem.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Note Content */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Current Note Content:</h4>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-[160px]">
                  <p className="text-gray-700 leading-relaxed">{currentItem.currentContent}</p>
                </div>
              </div>

              {/* Suggested Improvement */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Suggested Improvement:</h4>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200 min-h-[160px]">
                  <p className="text-gray-700 leading-relaxed">{currentItem.suggestedImprovement}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-10 space-x-4">
              <button 
                onClick={addRecording}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Add Recording</span>
              </button>
              <button 
                onClick={() => handleReviewAction('accept')}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
              >
                Accept
              </button>
              <button 
                onClick={() => handleReviewAction('decline')}
                className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
              >
                Decline
              </button>
              <button 
                onClick={() => handleReviewAction('skip')}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Note View with Side-by-Side Layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[90%] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Process details</h1>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={addRecording}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Add Recording</span>
              </button>
              <button 
                onClick={refineNote}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Refine Note</span>
              </button>
              <button 
                onClick={copyNote}
                className="px-4 py-2 bg-cyan-400 text-white rounded-lg font-medium hover:bg-cyan-500 flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy note</span>
              </button>
            </div>
          </div>

          {/* Patient info row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-lg font-medium text-gray-900">Emily Johnson</div>
                <div className="text-sm text-gray-500">38 years old</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="text-sm text-gray-900">Aspen Valley Hospital</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Organization</div>
                <div className="text-sm text-gray-900">Pacific Health</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Content Area */}
      <div className="max-w-[90%] mx-auto p-6">
        <div className="flex gap-6">
          {/* Left Panel - Notes Container (60%) */}
          <div className="w-[60%]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Patient Notes</h2>
              <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-280px)]">
                {/* Chief Complaint */}
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chief Complaint</h3>
                  <p className="text-gray-700 leading-relaxed">Confusion, irritability</p>
                </div>

                {/* History of Present Illness */}
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">History of Present Illness</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Robert Smith, the patient, is a male presenting with syncope during a marathon. They were running a marathon and started when they experienced and lost consciousness towards the end. The patient reports being told they were unconscious for about one to two minutes. Prior to the syncopal episode, they experienced increasing shortness of breath for about a minute and felt dizzy.
                  </p>
                </div>

                {/* Additional History */}
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional History Obtained From Source Other Than Patient</h3>
                  <p className="text-gray-700 leading-relaxed">
                    There was no additional history obtained
                  </p>
                </div>

                {/* Review of Systems */}
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review of Systems</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Constitutional Patient reports feeling weak and fatigued prior to syncopal episode. Denies fever, chills, night sweats, or unintentional weight loss.
                    </p>
                    <p>
                      - Neurological Patient demonstrates intermittent confusion and disorientation to time since arrival.
                    </p>
                    <p>
                      All other systems reviewed were normal.
                    </p>
                  </div>
                </div>

                {/* Physical Examination */}
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Examination</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <p><strong>Vital Signs:</strong> Temperature 98.6°F, Blood Pressure 125/78 mmHg, Heart Rate 82 bpm, Respiratory Rate 16/min, Oxygen Saturation 98% on room air</p>
                    <p><strong>General:</strong> Alert and oriented x3, appears comfortable, no acute distress</p>
                    <p><strong>Cardiovascular:</strong> Regular rate and rhythm, no murmurs, rubs, or gallops</p>
                    <p><strong>Pulmonary:</strong> Clear to auscultation bilaterally, no wheezes, rales, or rhonchi</p>
                    <p><strong>Neurological:</strong> Cranial nerves II-XII intact, motor strength 5/5 in all extremities, reflexes 2+ throughout</p>
                  </div>
                </div>

                {/* Assessment and Plan */}
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment and Plan</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <div>
                      <p><strong>1. Syncope (Exercise-induced)</strong></p>
                      <p className="ml-4 mt-2">
                        - Likely vasovagal episode triggered by prolonged exertion and dehydration during marathon
                        - EKG shows normal sinus rhythm with no acute changes
                        - Cardiac enzymes within normal limits
                        - Continue IV hydration
                        - Monitor cardiac rhythm
                        - Discharge home when stable with cardiology follow-up
                      </p>
                    </div>
                    <div>
                      <p><strong>2. Dehydration</strong></p>
                      <p className="ml-4 mt-2">
                        - Secondary to prolonged exercise with inadequate fluid replacement
                        - Normal saline bolus administered with improvement in symptoms
                        - Patient educated on proper hydration during endurance activities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Insights Container (40%) */}
          <div className="w-[40%]">
            {/* Version Selector */}
            <div className="mb-4 flex justify-end space-x-2">
              <button
                onClick={() => setInsightsVersion(1)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  insightsVersion === 1 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Version 1
              </button>
              <button
                onClick={() => setInsightsVersion(2)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  insightsVersion === 2 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Version 2
              </button>
              <button
                onClick={() => setInsightsVersion(3)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  insightsVersion === 3 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Version 3
              </button>
              <button
                onClick={() => setInsightsVersion(4)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  insightsVersion === 4 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Version 4
              </button>
              <button
                onClick={() => setInsightsVersion(5)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  insightsVersion === 5 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Version 5
              </button>
            </div>
            
            {/* Insights Panel or Optimize Workflow */}
            {showOptimizeWorkflow ? (
              useAltOptimize ? (
                <OptimizeWorkflowAlt
                  onClose={() => {
                    setShowOptimizeWorkflow(false);
                    setUseAltOptimize(false);
                  }}
                  patientNote={getFullNote()}
                />
              ) : (
                <OptimizeWorkflow
                  onClose={() => setShowOptimizeWorkflow(false)}
                  patientNote={getFullNote()}
                />
              )
            ) : (
              <>
                {insightsVersion === 1 && (
                  <InsightsV1 onStartOptimize={() => setShowOptimizeWorkflow(true)} />
                )}
                {insightsVersion === 2 && (
                  <InsightsV2 onStartOptimize={() => setShowOptimizeWorkflow(true)} />
                )}
                {insightsVersion === 3 && (
                  <InsightsV3 onStartOptimize={() => setShowOptimizeWorkflow(true)} />
                )}
                {insightsVersion === 4 && (
                  <InsightsV4 onStartOptimize={() => setShowOptimizeWorkflow(true)} />
                )}
                {insightsVersion === 5 && (
                  <InsightsV5 onStartOptimize={() => setShowOptimizeWorkflow(true)} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
