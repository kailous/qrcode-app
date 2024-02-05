// icons.js

const createSVGSymbol = (id, pathData) => {
    return `
      <symbol id="${id}" viewBox="0 0 32 32">
        <path d="${pathData}" stroke="black" stroke-width="4" stroke-linecap="round"/>
      </symbol>
    `;
  };
  
  export const icon1 = createSVGSymbol('copy', 'M11 11V4H28V21H21M11 11H4V28H21V21M11 11H21V21');
  export const icon2 = createSVGSymbol('close', 'M4 4L28 28M28 4L4 28');
  