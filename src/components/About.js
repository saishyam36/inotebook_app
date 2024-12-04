import React, { useState } from 'react'
import data from '../accordianData';

const About = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleSelected, setMultipleSelected] = useState([]);

  const handleClick = (getCurrentId) => {
    setSelected(getCurrentId)
  }

  const handleMultiSelection = (getCurrentId) => {
    let itemsInMultple = [...multipleSelected];
    const indexOfCurrentId = itemsInMultple.indexOf(getCurrentId);
    if (indexOfCurrentId === -1) {
      itemsInMultple.push(getCurrentId)
    } else {
      itemsInMultple.splice(indexOfCurrentId, 1)
    }
    setMultipleSelected(itemsInMultple)
  }


  return (
    <div className="wrapper">
      <button type='button' className="btn btn-secondary" onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection
        {enableMultiSelection ? <span className="badge text-bg-success"> </span>
          : <span className="badge text-bg-danger"> </span>}
      </button>
      <div className="accordian">
        {
          data && data.length > 0 ?
            data.map(dataItem => (
              <div className="accordion-item" key={dataItem.id}>
                <h2 className="accordion-header">
                  <button onClick={enableMultiSelection ? () => handleMultiSelection(dataItem.id) : () => handleClick(dataItem.id)} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {dataItem.question}
                  </button>
                </h2>
                {
                  enableMultiSelection ? multipleSelected.indexOf(dataItem.id) !== -1 &&
                    (<div id={dataItem.answer} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>{dataItem.answer}</strong>
                      </div>
                    </div>)
                    : selected === dataItem.id &&
                    (<div id={dataItem.answer} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <strong>{dataItem.answer}</strong>
                      </div>
                    </div>)
                }
              </div>
            ))
            : <div>No Data About noteBook!</div>
        }
      </div>
    </div>
  )
}

export default About