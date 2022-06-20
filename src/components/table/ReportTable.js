import React from 'react'
import { Component } from 'react'
import projects from './projects'

class ReportTable extends Component {
  constructor(props) {
    super(props)
    this.state = { expandedRows: [] }
  }

  handleExpand = (project) => {
    let newExpandedRows = [...this.state.expandedRows]
    let allExpanded = this.state.allExpanded
    let idxFound = newExpandedRows.findIndex((id) => {
      return id === project.id
    })

    if (idxFound > -1) {
      console.log('Collapsing ' + project.name + ' ' + idxFound)
      newExpandedRows.splice(idxFound, 1)
    } else {
      console.log('Expanding ' + project.name)
      newExpandedRows.push(project.id)
    }

    console.log('Expanded rows')
    console.log(newExpandedRows)

    this.setState({ expandedRows: [...newExpandedRows] })
  }

  isExpanded = (project) => {
    const idx = this.state.expandedRows.find((id) => {
      return id === project.id
    })
    return idx > -1
  }

  expandAll = (projects) => {
    if (this.state.expandedRows.length === projects.length) {
      let newExpandedRows = []
      this.setState({ expandedRows: [...newExpandedRows] })
    } else {
      let newExpandedRows = projects.map((project) => project.id)
      this.setState({ expandedRows: [...newExpandedRows] })
    }
  }

  getProjectTotal = (project) => {
    let sum = 0
    if (project.data && project.data.length) {
      for (let i = 0; i < project.data.length; i++) {
        sum += project.data[i].amount
      }
    }
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  getRows = (project) => {
    let rows = []
    const data = project.data || []

    const firstRow = (
      <div className="projectRow" onClick={() => this.handleExpand(project)}>
        <div>{project.name}</div>
        <div className="projectPrice">TOTAL: {this.getProjectTotal(project)} USD</div>
        {/* <div>
          {data.length > 0 && (
            <button onClick={() => this.handleExpand(project)}>
              {this.isExpanded(project) ? '-' : '+'}
            </button>
          )}
        </div> */}
      </div>
    )

    rows.push(firstRow)
    if (this.isExpanded(project) && data.length > 0) {
      const dataHeader = (
        <div className="detailHeader">
          <div>Date</div>
          <div>Gateway</div>
          <div>Transaction ID</div>
          <div>Amount</div>
        </div>
      )
      rows.push(dataHeader)
      const dataList = data.map((data, index) => (
        <div key={index} className="projectDetails">
          <div className="attribute">{data.date}</div>
          <div className="attribute">{data.gateway}</div>
          <div className="attribute">{data.transactionId}</div>
          <div className="attribute">{data.amount}</div>
        </div>
      ))

      rows.push(dataList)
    }

    return rows
  }

  getProjectTable = (projects) => {
    const projectRows = projects.map((project) => {
      return this.getRows(project)
    })

    return <div className="reportTable">{projectRows}</div>
  }

  render() {
    return <div className="reportDiv">{this.getProjectTable(projects)}</div>
  }
}

export default ReportTable
