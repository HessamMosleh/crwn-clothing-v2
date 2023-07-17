import {BackgroundImage, Body, DirectoryItemContainer, Header} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;

    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
              image={imageUrl}
            />
            <Body>
                <Header>{title}</Header>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;