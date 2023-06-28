import styled from 'styled-components'
export const StyledOverlay = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1200;

  }
  `
  export const StyledModal = styled.div`

        max-width: calc(100vw - 48px);
        max-height: calc(100vh - 24px);

        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // min-height: 300px;
        // max-width: 600px;
        // width: 100%;
        // background-color: #fff;
        // border-radius: 15px;
        // padding: 25px

}`




  