import React from 'react';
import Image from 'next/image';
const Loading: React.FC = () => {
    return (
        <div className="loading">
            <Image
                src="/loading.svg"
                alt="loading"
                width={350}
                height={350}
            />

        </div>
    );
};

export default Loading;
