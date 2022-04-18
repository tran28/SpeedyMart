function UnauthorizedPage() {
    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    <div className="box">
                        <div className="left">
                            <h2>Unauthorized</h2>
                        </div>
                        <div className="right">
                            <h3>ERROR: must log in with an admin account first before accessing this page</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UnauthorizedPage;