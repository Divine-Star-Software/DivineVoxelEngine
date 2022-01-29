
export const CommonShader = {
    getMainFunction : (functionBody : string)=>  {
        return `
        void main(void) {
            ${functionBody}
        }
        `;
    }

}