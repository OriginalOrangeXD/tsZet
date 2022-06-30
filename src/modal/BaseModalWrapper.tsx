import React from 'react'
import Modal from './Modal'
import { CloseSign, Header,DesktopCloseButton, DesktopModalContainer} from './ModalPopup.styles'

interface BaseModalWrapperProps {
    isModalVisable: boolean;
    onBackDropClick: () => void;
    header:string;
}

// interface ComponentsProps {
//     ContainerComponent: React.ComponentType<{}>;
//     CloseButtonComponent: React.ComponentType<{
//         onClick?: MouseEventHandler<any>
//     }>
// }
// 
// type Props = BaseModalWrapperProps & ComponentsProps;

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({isModalVisable, onBackDropClick, header}) => {
    if(!isModalVisable) { return null };
    return (<Modal onBackDropClick={onBackDropClick}>
            <DesktopModalContainer>
                <Header>{header}</Header>
            </DesktopModalContainer>
            </Modal>);
}

export default BaseModalWrapper;
