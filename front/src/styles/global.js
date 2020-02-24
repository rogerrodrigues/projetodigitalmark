import { createGlobalStyle, keyframes, css } from 'styled-components';

const rotate = keyframes`
from{
    transform: rotate(0deg);
}

to{
    transform: rotate(360deg);
}`;

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing: border-box;
    }
    html, body, #root {
        min-height:100%;
    }

    body{
        background: #7159c1;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button{
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

form{
    margin-top:30px;
    display:flex;
    flex-direction:column;
    max-width:300px;
    align-self:center;
    /* margin:30px auto 20px; */

}

form span{
    color: #f36363;
    font-weight: 100;
    padding: 4px;
}

.form-bottom{
    flex-direction:row;
}

    input{
        flex: 1;
        border: 1px solid #eee;
        padding: 15px 15px;
        border-radius: 4px;
        font-size: 16px;
        margin-bottom: 10px;
    }

    button{
        cursor:pointer;
    }

.btn-secondary {
    background: #dfdfdf;
border: 0;
padding: 10px 20px;
margin-left: 10px;
border-radius: 4px;
color: #4a4a4a;
display: inline;
text-decoration: none;
text-align:center;
}

.btn-primary {
    background: #7159c1;
border: 0;
padding: 10px 20px;
border-radius: 4px;
color: #FFF;
display: inline;
text-align:center;
text-decoration: none;
}
    .Modal {
    /* position: absolute;
    top: 10%;
    left: 50%;
    right: 50%;
    bottom: 40px;
    margin-left: -200px;
    border: 1px solid rgb(204,204,204);
    background: rgb(255,255,255);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    width: 400px;
    min-height:100px;
    max-height:200px; */
    border: 1px solid rgb(204,204,204);
    position:fixed;
  background: white;
  width: 30%;
  height: auto;
  top:20%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius:4px;
  padding:20px;
}
.Modal p{
    text-align:center;
    padding:30px 0 30px;
}

.modal-bottom{
    text-align:center;
}

  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rebeccapurple;
  }

.loading{
    text-align:center;
    padding:30px 0 ;
}
 
  ${
    css`svg.rotate {
            animation: ${rotate} 1s linear infinite;
        }`
    }
`;