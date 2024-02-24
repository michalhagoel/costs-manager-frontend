import '../styles/Report.css';

function Report() {
    const currentYear = (new Date()).getFullYear();
    const years = [];
    const months = [];

    for (let i = 0; i < 12; i++) {
        const monthOption = <option key={`month${i}`} value={i + 1}>{i + 1}</option>;
        months.push(monthOption);
    }

    for (let i = 0; i < 30; i++) {
        const yearOption = <option key={`year${i}`} value={currentYear-i}>{currentYear-i}</option>;
        years.push(yearOption);
    }
    return (
        <div>
            <div className='container down'>
                <form className='form'>
                    <div className='row space'>
                        <select>{years}</select>
                        <select>{months}</select>
                    </div>
                    <div className='row middle'>
                        <button onClick={getReport()}>Get Report</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function getReport () {

}

export default Report;
