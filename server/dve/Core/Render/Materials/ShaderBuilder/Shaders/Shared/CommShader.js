export const CommonShader = {
    getMainFunction: (functionBody) => {
        return `
        void main(void) {
            ${functionBody}
        }
        `;
    }
};
