import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const GetConstantValue = ({configKey}) => {
  const context = useDocusaurusContext();
  const value = context.siteConfig.customFields?.[configKey];
  return (
    <>{value || ''}</>
  );
};

export default GetConstantValue; 