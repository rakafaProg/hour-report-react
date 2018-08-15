import React from 'react';

const Main = () => {
    const mainStyle = {
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
    }

    return (
        <main className="ui segment orange" style={mainStyle}>
            <h1 className="ui header orange">Wellcome to our hour report app</h1>
            <hr />
            <h2>Please choose a link from above to start the brilliant action</h2>
        </main>
    );
}

export default Main;
