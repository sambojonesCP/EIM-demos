import React, { useState } from 'react';
import { Star, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';

export default function InsightsV3({ onStartOptimize }) {
  const [expandedSections, setExpandedSections] = useState({
    satisfaction: false,
    severity: false
  });

  const [showDetails, setShowDetails] = useState({
    satisfaction: false,
    severity: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleDetails = (section) => {
    setShowDetails(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    // When showing details, ensure the section is expanded
    if (!showDetails[section]) {
      setExpandedSections(prev => ({
        ...prev,
        [section]: true
      }));
    }
  };

  const severityData = {
    predictedLevel: 5,
    presentingProblem: {
      name: "Presenting Problem",
      level: "High",
      details: [
        "Primary: Chest Pain",
        "Final Diagnosis: Acute Myocardial Infarction (STEMI)",
        "Chronic Conditions: Hypertension, Hyperlipidemia",
        "Problems Addressed: 3 (1 acute life-threatening, 2 stable chronic)"
      ],
      evidence: "Life-threatening illness (AMI) with multiple problems managed simultaneously"
    },
    dataComplexity: {
      name: "Data Reviewed",
      level: "Moderate",
      details: [
        "Labs: Troponin, CBC, BMP",
        "Imaging: Chest X-ray, EKG",
        "Records: Prior EKGs, outpatient records",
        "Communication: Cardiology consultation",
        "Direct Interpretation: EKG reviewed personally"
      ],
      evidence: "Multiple tests ordered and interpreted with specialist consultation"
    },
    riskLevel: {
      name: "Risk Assessment",
      level: "High",
      details: [
        "Treatment: IV Nitroglycerin, Aspirin, O2 therapy",
        "Prognosis: High risk without intervention",
        "Disposition: Transfer to Cardiology",
        "Social Factors: Lives alone, follow-up concerns noted"
      ],
      evidence: "Critical care interventions with admission required"
    },
    recommendations: {
      criticalItems: [
        "Document any critical care time over 30 minutes",
        "Explicitly note personal test interpretation",
        "Clarify data attribution for labs/imaging",
        "Record details of specialist communication",
        "Document relevant social risk factors"
      ]
    }
  };

  const categories = [
    {
      name: 'Friendliness & Courtesy',
      score: 5,
      evidence: "\"Hi there, Mr. Doe. I'm Dr. Smith — it's good to meet you.\"",
      notes: ['Warm greeting detected; respectful tone maintained'],
      improvements: []
    },
    {
      name: 'Explanation of Conditions & Problems',
      score: 4,
      evidence: "\"We'll get a chest X-ray and an EKG... I'll explain each as we go.\"",
      notes: ['Clear but could have included more patient-friendly terms'],
      improvements: [
        'Use lay language when introducing medical procedures',
        'Pause after key medical terms to invite questions'
      ]
    },
    {
      name: 'Concern for Questions & Worries',
      score: 4,
      evidence: "\"Do you have any concerns about the testing?\"",
      notes: ['Engaged the patient once but did not return to concerns later'],
      improvements: []
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Insights</h2>
      <div className="space-y-8">
        {/* Patient Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Patient Experience</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-0.5">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-lg font-medium text-gray-700">4.2/5.0</span>
            </div>
          </div>
          
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
            <div className="text-sm text-blue-800 space-y-2">
              <div className="font-medium">Key Insights:</div>
              <div>• Model Confidence: 93%</div>
              <div>• Patient likely felt reassured, informed, and respected</div>
              <div>• Visit Duration: 18 min (within target range)</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toggleSection('satisfaction')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              {expandedSections.satisfaction ? 
                <><span>View Less</span><ChevronUp className="w-4 h-4 ml-1" /></> : 
                <><span>See More</span><ChevronDown className="w-4 h-4 ml-1" /></>
              }
            </button>
          </div>

          {expandedSections.satisfaction && (
            <div className="mt-6 space-y-6">
              {/* Top Categories */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Top Categories</h4>
                {categories.map((category, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${
                              i < category.score 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {category.evidence && (
                      <div className="text-sm text-gray-600 italic">{category.evidence}</div>
                    )}
                  </div>
                ))}

                {/* Detailed Report Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => toggleDetails('satisfaction')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    {showDetails.satisfaction ? (
                      <><Minus className="w-4 h-4 mr-1" /> <span>Hide Detailed Report</span></>
                    ) : (
                      <><Plus className="w-4 h-4 mr-1" /> <span>View Detailed Report</span></>
                    )}
                  </button>
                </div>

                {/* Detailed Report Content */}
                {showDetails.satisfaction && (
                  <div className="space-y-6 pt-6">
                    {/* Visit Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Visit Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Visit Type:</span>
                          <span className="text-gray-900 ml-2">ED</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="text-gray-900 ml-2">18 min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Transcript Quality:</span>
                          <span className="text-gray-900 ml-2">94%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">NLP Confidence:</span>
                          <span className="text-gray-900 ml-2">High</span>
                        </div>
                      </div>
                    </div>

                    {/* Full Category Analysis */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900">Full Category Analysis</h4>
                      {categories.map((category, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{category.name}</span>
                            <div className="flex items-center space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < category.score 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {category.evidence && (
                            <div className="text-sm text-gray-600 italic mb-2">
                              {category.evidence}
                            </div>
                          )}
                          {category.notes.map((note, noteIndex) => (
                            <div key={noteIndex} className="text-sm text-gray-600 ml-4 mb-1">
                              • {note}
                            </div>
                          ))}
                          {category.improvements.length > 0 && (
                            <div className="mt-2 text-sm">
                              <div className="text-orange-700 font-medium">Improvements:</div>
                              {category.improvements.map((improvement, impIndex) => (
                                <div key={impIndex} className="text-orange-600 ml-4">
                                  • {improvement}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Coaching & Feedback */}
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Coaching & Feedback</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center text-green-700 mb-2">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            <span className="font-medium">Strengths</span>
                          </div>
                          <div className="ml-7 space-y-1">
                            <div className="text-gray-700">• Warm greeting, confident tone, clear instructions</div>
                            <div className="text-gray-700">• Positive patient sentiment during reassurance segments</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center text-orange-700 mb-2">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Opportunities</span>
                          </div>
                          <div className="ml-7 space-y-1">
                            <div className="text-gray-700">• Increase patient involvement in decisions</div>
                            <div className="text-gray-700">• Provide more specific follow-up instructions</div>
                            <div className="text-gray-700">• Use plain-language explanations consistently</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Predicted Severity Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Predicted Severity Level</h3>
            <div className="text-lg font-medium text-blue-700 py-1 px-3 bg-blue-50 rounded-lg">
              Level {severityData.predictedLevel}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
            <div className="text-sm text-blue-800 space-y-2">
              <div className="font-medium">Documentation Considerations:</div>
              {severityData.recommendations.criticalItems.slice(0, 3).map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
              {severityData.recommendations.criticalItems.length > 3 && (
                <div className="text-blue-600">+ {severityData.recommendations.criticalItems.length - 3} more items</div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toggleSection('severity')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              {expandedSections.severity ? 
                <><span>View Less</span><ChevronUp className="w-4 h-4 ml-1" /></> : 
                <><span>See More</span><ChevronDown className="w-4 h-4 ml-1" /></>
              }
            </button>
          </div>

          {expandedSections.severity && (
            <div className="mt-6 space-y-6">
              {/* Complexity Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Problem Complexity</div>
                  <div className="text-red-600 font-medium">{severityData.presentingProblem.level}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Data Complexity</div>
                  <div className="text-yellow-600 font-medium">{severityData.dataComplexity.level}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Risk Level</div>
                  <div className="text-red-600 font-medium">{severityData.riskLevel.level}</div>
                </div>
              </div>

              {/* Detailed Report Button */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleDetails('severity')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  {showDetails.severity ? (
                    <><Minus className="w-4 h-4 mr-1" /> <span>Hide Detailed Analysis</span></>
                  ) : (
                    <><Plus className="w-4 h-4 mr-1" /> <span>View Detailed Analysis</span></>
                  )}
                </button>
              </div>

              {/* Detailed Analysis */}
              {showDetails.severity && (
                <div className="space-y-6">
                  {/* Problem Complexity */}
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-medium text-gray-900">{severityData.presentingProblem.name}</h4>
                      <span className="text-sm font-medium text-white px-3 py-1 rounded bg-red-500">
                        {severityData.presentingProblem.level}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {severityData.presentingProblem.details.map((detail, index) => (
                        <div key={index} className="text-sm text-gray-600 ml-4">• {detail}</div>
                      ))}
                      <div className="text-sm text-blue-700 mt-2 italic">
                        {severityData.presentingProblem.evidence}
                      </div>
                    </div>
                  </div>

                  {/* Data Complexity */}
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-medium text-gray-900">{severityData.dataComplexity.name}</h4>
                      <span className="text-sm font-medium text-white px-3 py-1 rounded bg-yellow-500">
                        {severityData.dataComplexity.level}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {severityData.dataComplexity.details.map((detail, index) => (
                        <div key={index} className="text-sm text-gray-600 ml-4">• {detail}</div>
                      ))}
                      <div className="text-sm text-blue-700 mt-2 italic">
                        {severityData.dataComplexity.evidence}
                      </div>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-medium text-gray-900">{severityData.riskLevel.name}</h4>
                      <span className="text-sm font-medium text-white px-3 py-1 rounded bg-red-500">
                        {severityData.riskLevel.level}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {severityData.riskLevel.details.map((detail, index) => (
                        <div key={index} className="text-sm text-gray-600 ml-4">• {detail}</div>
                      ))}
                      <div className="text-sm text-blue-700 mt-2 italic">
                        {severityData.riskLevel.evidence}
                      </div>
                    </div>
                  </div>

                  {/* Documentation Considerations */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Documentation Considerations</h4>
                    <div className="space-y-3">
                      {severityData.recommendations.criticalItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
