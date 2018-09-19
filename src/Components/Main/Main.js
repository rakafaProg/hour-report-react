import React, { Component } from 'react';
import Card from './Card';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropTo from './DropTo';

class Main extends Component {

    state = {
        list: [
            { id: 0, name: "0", family: "0", phone: "0", position: 0 },
            { id: 1, name: "1", family: "1", phone: "1", position: 1 },
            { id: 2, name: "2", family: "2", phone: "2", position: 2 },
            { id: 3, name: "3", family: "3", phone: "3", position: 3 },
            { id: 4, name: "4", family: "4", phone: "4", position: 4 },
            { id: 5, name: "5", family: "5", phone: "5", position: 5 },
        ]
    }


    renderList() {



        let z = [];
        this.state.list.map(item => {
            z[item.position] = (
                <div key={item.id}>
                    <DropTo
                        item={item}
                    />
                    <Card item={item}
                        move={(target) => {
                            const ind = target.position > item.position ? -1 : 1;
                            let myItem = {};
                            let list = this.state.list.slice();
                            list.forEach(x => {

                                if (
                                    (x.position < item.position && x.position >= target.position) ||
                                    (x.position >= item.position && x.position < target.position)
                                ) {
                                    x.position += ind;

                                }
                                if (x.id == item.id) {
                                    myItem = x;
                                }
                            });

                            myItem.position = target.position;
                            if (ind == -1) myItem.position -= 1
                            this.setState({ list });
                        }}
                    />
                </div>
            )
        });
        return z;
    }

    render() {
        const mainStyle = {
            maxWidth: "800px",
            margin: "auto",
            padding: "20px",
        }



        return (
            <main className="ui segment orange" style={mainStyle}>
                <h1 className="ui header orange">Wellcome to our hour report app</h1>
                <hr />
                {this.renderList()}
                <DropTo
                    item={{ id: this.state.list.length, position: this.state.list.length, }}
                />
            </main>
        );
    }
}



export default DragDropContext(HTML5Backend)(Main);



