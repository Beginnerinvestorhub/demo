import React from 'react';

const VisualLearner: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">For Visual Learners</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Infographics</h4>
          <p>Explore our collection of infographics on various investment topics.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Video Tutorials</h4>
          <p>Watch our video tutorials to learn the basics of investing.</p>
        </div>
      </div>
    </div>
  );
};

export default VisualLearner;
