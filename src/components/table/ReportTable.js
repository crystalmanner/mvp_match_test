import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'
import noData from 'src/assets/images/noData.png'
import { CRow, CCol } from '@coreui/react'
// import { CChartDoughnut } from '@coreui/react-chartjs'
import Chart from 'react-google-charts'

class ReportTable extends Component {
  constructor(props) {
    super(props)
    this.state = { expandedRows: [] }
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.projects) === JSON.stringify(nextProps.projects)) {
      return false
    } else {
      return true
    }
  }

  handleExpand = (project) => {
    let newExpandedRows = [...this.state.expandedRows]
    let allExpanded = this.state.allExpanded
    let idxFound = newExpandedRows.findIndex((id) => {
      return id === project.id
    })

    if (idxFound > -1) {
      newExpandedRows.splice(idxFound, 1)
    } else {
      newExpandedRows.push(project.id)
    }
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

  formatProjectTotal = (project) => {
    let sum = 0
    if (project.data && project.data.length) {
      for (let i = 0; i < project.data.length; i++) {
        sum += project.data[i].amount
      }
    }
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  getTotalAmount = () => {
    let sum = 0
    for (let i = 0; i < this.props.projects.length; i++) {
      if (this.props.projects[i].data && this.props.projects[i].data.length) {
        for (let j = 0; j < this.props.projects[i].data.length; j++) {
          sum += this.props.projects[i].data[j].amount
        }
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
        <div className="projectPrice">TOTAL: {this.formatProjectTotal(project)} USD</div>
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

  renderTotalAmount = () => {
    if (
      (this.props.selectedProject === 'All projects' &&
        this.props.selectedGateway === 'All gateways') ||
      (this.props.selectedProject !== 'All projects' &&
        this.props.selectedGateway !== 'All gateways')
    ) {
      return (
        <CRow className="filteredReport">
          <CCol xs>
            <div>TOTAL: {this.getTotalAmount()}USD</div>
          </CCol>
        </CRow>
      )
    }
    return <></>
  }

  renderDoughnutChart = () => {
    let isProduct =
      this.props.selectedProject !== 'All projects' && this.props.selectedGateway === 'All gateways'
    let isGateway =
      this.props.selectedProject === 'All projects' && this.props.selectedGateway !== 'All gateways'
    if (isProduct || isGateway) {
      const data = [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ]
      const options = {
        pieHole: 0.4,
        is3D: false,
      }
      return (
        <>
          <CCol className="pieChart" xs>
            <Chart chartType="PieChart" width="100%" height="350px" data={data} options={options} />
          </CCol>
          <CRow className="filteredReport">
            <CCol xs>
              <div>TOTAL: {this.getTotalAmount()}USD</div>
            </CCol>
          </CRow>
          <div>{isProduct}</div>
        </>
      )
    }
    return <></>
  }

  render() {
    if (this.props.projects && this.props.projects.length) {
      return (
        <>
          <button onClick={() => this.props.childTestFunc('testtest')}>test button</button>
          <CRow>
            <CCol className="filteredReport" xs>
              <div className="filterText">
                {this.props.selectedProject} | {this.props.selectedGateway}
              </div>
              <div className="reportDiv">{this.getProjectTable(this.props.projects)}</div>
            </CCol>
            {this.renderDoughnutChart()}
          </CRow>
          {this.renderTotalAmount()}
        </>
      )
    }
    return (
      <div className="noReportContainer">
        <div className="noReport">
          <h4 className="card-title">No reports</h4>
          <div className="no-data-context">
            Currently you have no data for the reports to be generated.
            <br />
            Once you start generating traffic through the Balance application the reports will be
            shown.
          </div>
          <div>
            <img height={170} width={400} src={noData} alt="no data" />
          </div>
        </div>
      </div>
    )
  }
}

ReportTable.propTypes = {
  projects: PropTypes.PropTypes.array.isRequired,
  selectedProject: PropTypes.string.isRequired,
  selectedGateway: PropTypes.string.isRequired,
  childTestFunc: PropTypes.func.isRequired,
}
export default ReportTable
