import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  FileText,
  ArrowRight
} from 'lucide-react';

export default function InsightsV5({ onStartOptimize }) {
  const [activeTab, setActiveTab] = useState('hub');
  const [expandedSections, setExpandedSections] = useState({
    satisfaction: false,
    severity: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Data for detailed views
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
    },
    {
      name: 'Shared Decision-Making',
      score: 3,
      evidence: "\"We'll go ahead and start with X-ray and labs.\"",
      notes: ['Directive tone, limited options or partnership phrasing'],
      improvements: [
        'Ask patient what approach they prefer',
        'Offer at least two options, even if one is recommended'
      ]
    },
    {
      name: 'Medication & Treatment Explanation',
      score: 4,
      evidence: "\"We're starting aspirin to help your heart.\"",
      notes: ['Clear but no discussion of potential side effects'],
      improvements: []
    },
    {
      name: 'Follow-Up Care Instructions',
      score: 3,
      evidence: "\"I'll be here if you have follow-up questions.\"",
      notes: ['No clear next steps or referral plan mentioned'],
      improvements: ['Outline next steps (who, when, how) clearly']
    }
  ];

  // Render Insights Hub (default tab)
  const renderInsightsHub = () => (
    <div className="p-8 space-y-8">
      {/* Complexity Analysis Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Complexity Analysis</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Problem Complexity</div>
            <div className="text-red-600 font-medium">High (5)</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Data Complexity</div>
            <div className="text-yellow-600 font-medium">Moderate (3)</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Risk Level</div>
            <div className="text-red-600 font-medium">High (5)</div>
          </div>
        </div>
      </div>

      {/* Predicted Severity Section */}
      <div className="border-b border-gray-100 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setActiveTab('severity')}
            className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Predicted Severity <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-800">2</span>
            <span className="text-lg text-gray-600">/5</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Low Risk
            </span>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-orange-900">📋 Documentation Considerations:</span>
          </div>
          <div className="text-sm text-orange-800 space-y-2">
            <div>• Did you personally interpret any test results?</div>
            <div>• Are there any relevant social determinants of health?</div>
            <div>• Was more than 30 minutes spent documenting critical care?</div>
          </div>
        </div>
      </div>

      {/* Patient Experience Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setActiveTab('experience')}
            className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Patient Experience <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-0.5">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <Star className="w-5 h-5 text-gray-300" />
            </div>
            <span className="text-lg font-medium text-gray-700">(4/5)</span>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-blue-900">🎯 Key Opportunities:</span>
          </div>
          <div className="text-sm text-blue-800 space-y-2">
            <div>• Increase Patient Involvement in decisions</div>
            <div>• Provide more specific follow-up instructions</div>
            <div>• Use plain-language explanations consistently</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Predicted Severity Detail Tab
  const renderSeverityDetail = () => (
    <div className="p-8 space-y-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Predicted Severity</h3>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
        <div className="text-sm text-blue-800 space-y-2">
          <div className="font-medium">Documentation Considerations (Questions):</div>
          <div>• Did you document any critical care time over 30 minutes?</div>
          <div>• Did you explicitly note personal test interpretation?</div>
          <div>• Did you clarify data attribution for labs/imaging?</div>
          <div>• Did you record details of specialist communication?</div>
          <div>• Did you document relevant social risk factors?</div>
        </div>
      </div>

      {/* Complexity Analysis Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-3">Complexity Analysis</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Problem Complexity</div>
            <div className="text-red-600 font-medium">{severityData.presentingProblem.level} (5)</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Data Complexity</div>
            <div className="text-yellow-600 font-medium">{severityData.dataComplexity.level} (3)</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-600 mb-1">Risk Level</div>
            <div className="text-red-600 font-medium">{severityData.riskLevel.level} (5)</div>
          </div>
        </div>
      </div>

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
    </div>
  );

  // Render Patient Experience Detail Tab
  const renderExperienceDetail = () => (
    <div className="p-8 space-y-8">
      <div className="mb-6">
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
              <AlertTriangle className="w-5 h-5 mr-2" />
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

      {/* Category Scores */}
      <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-900">Category-by-Category Scoring</h4>
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
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header with Tabs */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Insights</h2>
          <button
            onClick={() => onStartOptimize()}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Start Note Optimization</span>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('hub')}
            className={`pb-3 font-medium border-b-2 transition-colors ${
              activeTab === 'hub'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Insights Hub
          </button>
          <button
            onClick={() => setActiveTab('severity')}
            className={`pb-3 font-medium border-b-2 transition-colors ${
              activeTab === 'severity'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Predicted Severity
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-3 font-medium border-b-2 transition-colors ${
              activeTab === 'experience'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Patient Experience
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
        {activeTab === 'hub' && renderInsightsHub()}
        {activeTab === 'severity' && renderSeverityDetail()}
        {activeTab === 'experience' && renderExperienceDetail()}
      </div>
    </div>
  );
}
