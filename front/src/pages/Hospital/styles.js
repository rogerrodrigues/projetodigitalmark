import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
    margin-top: 30px;

    input{
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        margin-bottom: 10px;
    }

    a{
       margin-bottom:10px;
       padding: 10px 15px;
    } 
`;

const rotate = keyframes`
from{
    transform: rotate(0deg);
}

to{
    transform: rotate(360deg);
}
`;

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading2
}))`
background: #7159c1;
border: 0;
padding: 10px 40px;
border-radius: 4px;
color: #FFF;
display: inline;

&[disabled]{
    cursor:not-allowed;
    opacity: 0.6;    
}

${props =>
    !!props.loading2 &&
        css`svg{
            animation: ${rotate} 1s linear infinite;
        }`
}
`;