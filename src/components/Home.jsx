const navigator = useNavigate();

const Home = () => {
    function viewEmployee(){
        navigator('/employees')
    }
    return(
        <div className="home">
            <h1>Employee Management System</h1>
            <div className="mb-3 row">
                <div style={{textAlign : 'center'}}>
                    <button onClick={viewEmployee}>View Employee</button>
                </div>
            </div>
        </div>
    );
}