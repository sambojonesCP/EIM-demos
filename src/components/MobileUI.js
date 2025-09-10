import React, { useState } from 'react';
import { ChevronDown, Home, Plus, Settings, Star, ArrowLeft, X } from 'lucide-react';

// Star Rating Component
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300" />
          <Star 
            className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gray-300" />
      );
    }
  }
  
  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

export default function HospitalPatientUI() {
  const [activeTab, setActiveTab] = useState('Archived');
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('Note');
  const [expandedSections, setExpandedSections] = useState({
    satisfaction: false,
    severity: false
  });

  const patients = [
    {
      id: 1,
      name: 'Emily Johnson',
      age: 38,
      status: 'Complete',
      statusColor: 'bg-cyan-400',
      expiresIn: '24 hours',
      avatar: 'EJ',
      satisfactionScore: 4,
      predictedSeverity: 2
    },
    {
      id: 2,
      name: 'Danielle Phillip',
      age: 32,
      status: 'Pending',
      statusColor: 'bg-pink-300',
      expiresIn: null,
      avatar: 'DP',
      satisfactionScore: 4.5,
      predictedSeverity: 3
    }
  ];

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setCurrentScreen('detail');
  };

  const handleBackClick = () => {
    setCurrentScreen('list');
    setSelectedPatient(null);
    setActiveDetailTab('Note');
    setExpandedSections({ satisfaction: false, severity: false });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Patient Detail Screen

  // Patient Detail Screen
  if (currentScreen === 'detail' && selectedPatient) {
    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-3 pb-2 text-black font-medium">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="w-4 h-2 border border-black rounded-sm">
              <div className="w-full h-full bg-black rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 py-4 flex items-center space-x-3">
          <button onClick={handleBackClick}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          <h1 className="text-lg font-medium text-gray-800">{selectedPatient?.name}, {selectedPatient?.age}</h1>
        </div>

        {/* Detail Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-8 border-b border-gray-200">
            {['Note', 'Insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`pb-3 font-medium ${
                  activeDetailTab === tab
                    ? 'text-black border-b-2 border-cyan-400'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 space-y-6 pb-6">
          {activeDetailTab === 'Note' ? (
            // Note Content
            <>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Chief Complaint</h3>
                <p className="text-gray-700 text-sm">Confusion, irritability</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">History of Present Illness</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Robert Smith, the patient, is a male presenting with syncope during a marathon. They were running a marathon and started when they experienced and lost consciousness towards the end. The patient reports being told they were unconscious for about one to two minutes. Prior to the syncopal episode, they experienced increasing shortness of breath for about a minute and felt dizzy.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Additional History Obtained From Source Other Than Patient</h3>
                <p className="text-gray-700 text-sm">There was no additional history obtained</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Review of Systems</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Constitutional Patient reports feeling weak and fatigued prior to syncopal episode. Denies fever, chills, night sweats, or unintentional weight loss.
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  - Neurological Patient demonstrates intermittent confusion and disorientation to time since arrival.
                </p>
                <p className="text-gray-700 text-sm mt-4">All other systems reviewed were normal.</p>
              </div>
            </>
          ) : (
            // Insights Content
            <>
              {/* Complexity Analysis Summary */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Complexity Analysis</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-white rounded shadow-sm">
                    <div className="text-xs text-gray-600 mb-1">Problem</div>
                    <div className="text-red-600 font-medium text-xs">High (5)</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded shadow-sm">
                    <div className="text-xs text-gray-600 mb-1">Data</div>
                    <div className="text-yellow-600 font-medium text-xs">Moderate (3)</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded shadow-sm">
                    <div className="text-xs text-gray-600 mb-1">Risk</div>
                    <div className="text-red-600 font-medium text-xs">High (5)</div>
                  </div>
                </div>
              </div>

              {/* Predicted Severity Section */}
              <div className="bg-gray-50 rounded-lg mb-6">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Predicted Severity</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800">{selectedPatient?.predictedSeverity}</span>
                      <span className="text-sm text-gray-600">/5</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedPatient?.predictedSeverity <= 2 ? 'bg-green-100 text-green-800' :
                        selectedPatient?.predictedSeverity <= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedPatient?.predictedSeverity <= 2 ? 'Low' :
                         selectedPatient?.predictedSeverity <= 3 ? 'Medium' : 'High'} Risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-orange-900">📋 Documentation Considerations:</span>
                    </div>
                    <div className="text-xs text-orange-800 space-y-1">
                      <div>• Did you personally interpret any test results?</div>
                      <div>• Are there any relevant social determinants of health?</div>
                      <div>• Was more than 30 minutes spent documenting critical care?</div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleSection('severity')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {expandedSections.severity ? '- see less' : '+ see more'}
                    </button>
                  </div>
                </div>
                
                {expandedSections.severity && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-900 mb-3">⚖️ Severity Justification:</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">COPA: 1 life-threatening problem + 2 chronic problems actively managed</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">Data: Labs + multiple imaging + external consult + independent interpretation</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">Risk: IV meds + critical illness + admission + social complexity considered</span>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-700 italic">
                          All 3 elements (COPA, Data, Risk) meet or exceed High complexity threshold
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Patient Experience Section */}
              <div className="bg-gray-50 rounded-lg">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Patient Experience</h3>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={selectedPatient?.satisfactionScore} />
                      <span className="text-sm text-gray-600">({selectedPatient?.satisfactionScore}/5)</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-blue-900">🎯 Key Opportunities:</span>
                    </div>
                    <div className="text-xs text-blue-800 space-y-1">
                      <div>• Increase Patient Involvement in decisions</div>
                      <div>• Provide more specific follow-up instructions</div>
                      <div>• Use plain-language explanations consistently</div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => toggleSection('satisfaction')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {expandedSections.satisfaction ? '- see less' : '+ see more'}
                    </button>
                  </div>
                </div>
                
                {expandedSections.satisfaction && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-900 mb-3">✅ Strengths:</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">Warm greeting, confident tone, clear instructions</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs text-gray-700">Positive patient sentiment during reassurance segments</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">💡 Pro Tip:</h4>
                        <p className="text-xs text-gray-600">
                          Consider summarizing the care plan and checking for understanding using phrases like "Does that make sense?" or "What questions do you have so far?"
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-gray-900 mb-2">Categories for Improvement:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Shared Decision Making</span>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-0.5">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 text-gray-300" />
                                <Star className="w-3 h-3 text-gray-300" />
                              </div>
                              <span className="text-xs text-gray-600">3/5</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-700">Follow Up Care Instructions</span>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-0.5">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <Star className="w-3 h-3 text-gray-300" />
                                <Star className="w-3 h-3 text-gray-300" />
                              </div>
                              <span className="text-xs text-gray-600">3/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom Buttons - ALWAYS VISIBLE */}
        <div className="px-6 py-4 space-y-3 bg-white border-t border-gray-100">
          <div className="flex space-x-4">
            <button className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium">
              Add Recording
            </button>
            <button className="flex-1 py-3 bg-cyan-400 rounded-lg text-white font-medium">
              Refine Note
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    );
  }

  // Patient List Screen (Original)
  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 pt-3 pb-2 text-black font-medium">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>
          <div className="w-4 h-2 border border-black rounded-sm">
            <div className="w-full h-full bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          <h1 className="text-lg font-medium text-gray-800">Aspen Valley Hospital</h1>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex space-x-8 border-b border-gray-200">
          {['Active', 'Archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-medium ${
                activeTab === tab
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 px-6 space-y-4">
        {patients.map((patient) => (
          <button
            key={patient.id}
            className="w-full text-left"
            onClick={() => handlePatientClick(patient)}
          >
            <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {patient.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <span className="w-2 h-2 bg-pink-300 rounded-full mr-2"></span>
                      {patient.age} years old
                    </p>
                    <div className="mt-2 h-12 flex flex-col">
                      <p className="text-xs text-gray-600 mb-1">Patient Experience</p>
                      <div className="flex items-center h-6">
                        <StarRating rating={patient.satisfactionScore} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4 flex flex-col justify-between h-full min-h-[80px]">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${patient.statusColor}`}>
                      {patient.status}
                    </span>
                    <div className="h-8 flex items-center justify-end">
                      {patient.expiresIn && (
                        <p className="text-xs text-gray-500">
                          Expires in {patient.expiresIn}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto h-12 flex flex-col">
                    <p className="text-xs text-gray-600 mb-1">Predicted Severity</p>
                    <div className="flex items-center h-6">
                      <p className="text-base font-bold text-gray-800">{patient.predictedSeverity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center px-8 py-6 bg-white border-t border-gray-100 mt-auto">
        <button className="flex flex-col items-center space-y-1">
          <Home className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Dashboard</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1">
          <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-600">Add Patient</span>
        </button>
        
        <button className="flex flex-col items-center space-y-1">
          <Settings className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-400">Settings</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
}