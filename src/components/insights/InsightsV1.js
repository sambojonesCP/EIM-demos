import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function InsightsV1({ onStartOptimize }) {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Insights</h2>
      <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-280px)]">
        {/* Complexity Analysis Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
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
            <h3 className="text-xl font-semibold text-gray-900">Predicted Severity</h3>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-800">2</span>
              <span className="text-lg text-gray-600">/5</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Low Risk
              </span>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-orange-900">📋 Documentation Considerations:</span>
            </div>
            <div className="text-sm text-orange-800 space-y-2">
              <div>• Did you personally interpret any test results?</div>
              <div>• Are there any relevant social determinants of health?</div>
              <div>• Was more than 30 minutes spent documenting critical care?</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toggleSection('severity')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {expandedSections.severity ? '- see less' : '+ see more'}
            </button>
          </div>

          {expandedSections.severity && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">⚖️ Severity Justification:</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">COPA: 1 life-threatening problem + 2 chronic problems actively managed</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Data: Labs + multiple imaging + external consult + independent interpretation</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Risk: IV meds + critical illness + admission + social complexity considered</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-700 italic">
                  All 3 elements (COPA, Data, Risk) meet or exceed High complexity threshold
                </div>
              </div>
            </div>
          )}
        </div>

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
              <span className="text-lg font-medium text-gray-700">(4/5)</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-blue-900">🎯 Key Opportunities:</span>
            </div>
            <div className="text-sm text-blue-800 space-y-2">
              <div>• Increase Patient Involvement in decisions</div>
              <div>• Provide more specific follow-up instructions</div>
              <div>• Use plain-language explanations consistently</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => toggleSection('satisfaction')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {expandedSections.satisfaction ? '- see less' : '+ see more'}
            </button>
          </div>

          {expandedSections.satisfaction && (
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">✅ Strengths:</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Warm greeting, confident tone, clear instructions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Positive patient sentiment during reassurance segments</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-gray-700 mb-3">💡 Pro Tip:</h4>
                <p className="text-gray-600">
                  Consider summarizing the care plan and checking for understanding using phrases like "Does that make sense?" or "What questions do you have so far?"
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
