import React from 'react';

const AuralLearner: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">For Aural Learners</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Podcasts</h4>
          <p>Listen to our podcast series on investment strategies.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Audio Books</h4>
          <p>Explore our collection of audio books on finance and investing.</p>
        </div>
      </div>
    </div>
  );
};

export default AuralLearner;
