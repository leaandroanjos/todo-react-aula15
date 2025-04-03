import { ListGroup, Tab } from "react-bootstrap";
import { TodoItem } from "../model";
import ListItem from "./ListItem";

interface OldestPaneProps {
    items: TodoItem[],
    onCheck: (id: number) => void,
    isChecked: (id:number) => boolean
}

const OldestPane: React.FC<OldestPaneProps> = ({items, onCheck, isChecked}) => {
    const sortedItems = [... items].sort((a,b) => {
        const dateA = a.deadline ? new Date(a.deadline).getTime() : 0;
        const dateB = b.deadline ? new Date(b.deadline).getTime() : 0;

        return dateA - dateB;
    })

    return (
        <Tab.Pane eventKey="oldest-pane" id="oldest-pane">
            <ListGroup id="oldest-content" variant="flush">
                {sortedItems.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        isChecked={isChecked(item.id)}
                        onCheck={onCheck}
                    />
                ))}
            </ListGroup>
        </Tab.Pane>
    );
}

export default OldestPane;