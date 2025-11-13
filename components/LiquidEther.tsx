// components/LiquidEther.tsx

import React from 'react';

// This is a placeholder component. It is designed to accept all the props you
// provided in your request so that the application can run without errors.
// You can replace the content of this component with your actual liquid
// animation library or your custom animation code whenever you are ready.

const LiquidEther: React.FC<any> = (props) => {
    // We get the colors from the props to use in the placeholder gradient
    const gradientColors = props.colors || ['#5227FF', '#FF9FFC', '#B19EEF'];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
            opacity: 0.15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b949e', // Matches your text-secondary theme color
            fontSize: '14px',
            fontFamily: 'monospace',
            textAlign: 'center',
            padding: '20px'
        }}>
            LiquidEther Animation Placeholder
        </div>
    );
};

export default LiquidEther;