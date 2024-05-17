import { createContext } from 'react';

// 创FullPage上下文
const SectionContext = createContext({
  verticalAlign: false,
  sectionClassName: 'Section',
  sectionPaddingTop: '0',
  sectionPaddingBottom: '0',
});

export default SectionContext;
