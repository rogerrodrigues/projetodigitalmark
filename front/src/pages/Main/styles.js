import styled from 'styled-components';



export const Form = styled.form`

a{
    display:inline-block;
    margin: 30px 10px 0 0;
}`;

export const List = styled.div.attrs(props => ({
    isLoading: props.isLoading
}))`

a{
    background: #7159c1;
border: 0;
padding: 10px 20px;
margin-left: 10px;
border-radius: 4px;
color: #FFF;
display: inline;
text-decoration: none;
}

table{
width:100%;
padding:0 0px 20px;
line-height:2.5em;
border-top:1px solid #ddd;
margin-top:20px;
${props=> (
    !!props.isLoading && 
    `display:none`) }
}

div.loading{
    ${props=> (
    !props.isLoading && 
    `display:none`)
    }
}

td{
    padding:4px 0;
border-bottom:1px dashed #ddd;
    
}

p{
    padding:40px;
    text-align:center;
}

`;