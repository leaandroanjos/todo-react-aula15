import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab } from 'react-bootstrap';
import NewestPane from './NewestPane';
import OldestPane from './OldestPane';
import NavTabs from './NavTabs';
import { TodoItem, todoRepository } from '../model';
import Toolbar from './Toolbar';
import InsertFormModal from './InsertFormModal';


const Main: React.FC = () => {

    const [items, setItems] = useState<TodoItem[]>([]);
    const [checkedItems, setCheckedItems] = useState<{[id:number]:boolean}>({})
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    function fetchItems(){
        console.log("Fetching items from repo...")
        todoRepository.list()
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.log(`Failed to fetch items: ${error}`);
            })
    }

    useEffect(fetchItems, [refresh]);

    const onCheck = (id: number) => {
        console.log(`Changed check state for id: ${id}`)
        setCheckedItems({...checkedItems, [id]: !checkedItems[id]});
    }

    const isChecked = (id: number): boolean => {
        return checkedItems[id];
    }

    const handleAddClick = () => {
        setShowModal(true);
    }

    const handleModalHide = () => {
        setShowModal(false);

    }

    const handleRefresh = () => {
        setRefresh(!refresh);
    }

    const handleInsert = (item: TodoItem) => {
        todoRepository.insert(item)
            .then(() => {
                console.log(`Todo Item inserted`)
                handleRefresh();
                handleModalHide();
            })
            .catch((error) => {
                console.error(`Failed to insert todo Item`)
            });
    }

    return (
        <main className="pt-4 pb-5">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={10}> 
                        <Tab.Container defaultActiveKey="newest-pane">
                            <NavTabs />
                            <Tab.Content className="px-0 py-3 border border-top-0 bg-white rounded-bottom shadow">
                                <Toolbar onRefresh={() => {}} onAdd={handleAddClick} onRemove={() => {}}/>

                                <NewestPane items={items} onCheck={onCheck} isChecked={isChecked}/>
                                <OldestPane items={items} onCheck={onCheck} isChecked={isChecked}/>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <InsertFormModal 
                show = {showModal}
                onHide = {handleModalHide}
                onInsert = {handleInsert}
            />
        </main>
    );
};

export default Main;
