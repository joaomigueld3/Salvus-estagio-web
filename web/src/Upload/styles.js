import styled,{css} from 'styled-components';
import '../global.css';

const dragActive = css`
border-color: #065343;      /*verde*/
`;

const dragReject = css`
border-color: #e57878;      /*vermelho*/
`; 
export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
font-size: 18px;
border: 3px dashed #ddd;
border-radius: 4px;
cursor:pointer;
transition: height 0.2s ease;

${props => props.isDragActive && dragActive}
${props =>props.isDragReject && dragReject}
`;
const messageColors ={
    default: '#999',
    error: '#e57878',
    success: '#065343',
};

export const UploadMessage = styled.p`
display: flex;
color: ${props => messageColors[props.type || "default"]};
justify-content:center;
align-items: center;
padding: 15px 0;
`;

export const Container = styled.div`
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

export const Content = styled.div`
width: 100%;
max-width: 200px;
margin:30px;
background: #FFF;
border-radius:4px;
padding: 20px;
`;