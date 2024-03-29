import React from 'react';

const ApplicationLogo = ({ src, alt, className }) => {
    return (
        <img src={src} alt={alt} className={className} />
    );
}

export default ApplicationLogo;

