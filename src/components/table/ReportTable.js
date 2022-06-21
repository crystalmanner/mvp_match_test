import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import noData from 'src/assets/images/noData.png'
import { CRow, CCol } from '@coreui/react'
import Chart from 'react-google-charts'

const ReportTable = (props) => {
  const [expandedRows, setExpandedRows] = useState([])
  const [projects, setProjects] = useState([])

  const handleExpand = (project) => {
    let newExpandedRows = [...expandedRows]
    let idxFound = newExpandedRows.findIndex((id) => {
      return id === project.id
    })

    if (idxFound > -1) {
      newExpandedRows.splice(idxFound, 1)
    } else {
      newExpandedRows.push(project.id)
    }
    setExpandedRows(newExpandedRows)
  }

  const isExpanded = (project) => {
    const idx = expandedRows.find((id) => {
      return id === project.id
    })
    return idx > -1
  }

  const expandAll = (projects) => {
    if (expandedRows.length === projects.length) {
      let newExpandedRows = []
      setExpandedRows(newExpandedRows)
    } else {
      let newExpandedRows = projects.map((project) => project.id)
      setExpandedRows(newExpandedRows)
    }
  }

  const getProjectTotal = (project) => {
    let sum = 0
    if (project.data && project.data.length) {
      for (let i = 0; i < project.data.length; i++) {
        sum += project.data[i].amount
      }
    }
    return sum
  }

  const formatProjectTotal = (project) => {
    return getProjectTotal(project)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getTotalAmount = () => {
    let sum = 0
    for (let i = 0; i < projects.length; i++) {
      sum += getProjectTotal(projects[i])
    }
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const getRows = (project) => {
    let rows = []
    const data = project.data || []

    const firstRow = (
      <div className="projectRow" onClick={() => handleExpand(project)}>
        <div>{project.name}</div>
        <div className="projectPrice">TOTAL: {formatProjectTotal(project)} USD</div>
      </div>
    )

    rows.push(firstRow)
    if (isExpanded(project) && data.length > 0) {
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

  const getProjectTable = (projects) => {
    const projectRows = projects.map((project) => {
      return getRows(project)
    })

    return <div className="reportTable">{projectRows}</div>
  }

  const renderTotalAmount = () => {
    if (
      (props.selectedProject.name === 'All projects' &&
        props.selectedGateway.name === 'All gateways') ||
      (props.selectedProject.name !== 'All projects' &&
        props.selectedGateway.name !== 'All gateways')
    ) {
      return (
        <CRow className="total-block">
          <CCol xs>
            <div>TOTAL: {getTotalAmount()}USD</div>
          </CCol>
        </CRow>
      )
    }
    return <></>
  }

  const renderDoughnutChart = () => {
    let isProduct =
      props.selectedProject.name !== 'All projects' && props.selectedGateway.name === 'All gateways'
    let isGateway =
      props.selectedProject.name === 'All projects' && props.selectedGateway.name !== 'All gateways'
    if (isProduct || isGateway) {
      let data = [['Task', 'Hours per Day']]
      if (isProduct) {
        // Show Gateway chart of the selected project
        if (projects.length) {
          projects[0].data.forEach((detail) => data.push([detail.gateway, detail.amount]))
        }
      } else {
        // Show Product chart for selected Gateway
        projects.forEach((project) => data.push([project.name, getProjectTotal(project)]))
      }

      const options = {
        pieHole: 0.4,
        is3D: false,
      }

      return (
        <>
          <CCol className="pieChart" xs>
            <Chart chartType="PieChart" width="100%" height="350px" data={data} options={options} />
            <CRow className="total-block">
              <CCol xs>
                <div>
                  {isProduct ? 'PROJECT' : 'GATEWAY'} TOTAL | {getTotalAmount()}USD
                </div>
              </CCol>
            </CRow>
          </CCol>
        </>
      )
    }
    return <></>
  }

  if (projects && projects.length) {
    return (
      <>
        <CRow>
          <CCol className="filteredReport" xs>
            <div className="filterText">
              {props.selectedProject.name} | {props.selectedGateway.name}
            </div>
            <div className="reportDiv">{getProjectTable(projects)}</div>
          </CCol>
          {renderDoughnutChart()}
        </CRow>
        {renderTotalAmount()}
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

ReportTable.propTypes = {
  // projects: PropTypes.PropTypes.array.isRequired,
  selectedProject: PropTypes.string.isRequired,
  selectedGateway: PropTypes.string.isRequired,
  selectedStartDate: PropTypes.string.isRequired,
  selectedEndDate: PropTypes.string.isRequired,
}
export default ReportTable
