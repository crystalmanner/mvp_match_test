import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ReportTableHeader = (props) => {
  const [selectedProject, setProject] = useState('Select project')
  const [selectedGateway, setGateway] = useState('Select gateways')
  const [projectList, setProjectList] = useState(['All projects'])
  const [gatewayList, setGatewayList] = useState(['All gateways'])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  useEffect(() => {
    // Get Available Product List
    let newProjectList = ['All projects']
    let newGatewayList = ['All gateways']
    props.projects.forEach((project) => {
      newProjectList.push(project.name)
      project.data.forEach((detail) => {
        if (!newGatewayList.includes(detail.gateway)) {
          newGatewayList.push(detail.gateway)
        }
      })
    })
    setProjectList(newProjectList)
    setGatewayList(newGatewayList)
  }, [props.projects])

  function generateReport() {
    props.generateProjects(selectedProject, selectedGateway, startDate, endDate)
  }

  return (
    <>
      <CRow>
        <CCol sm={4} className="pageHeader">
          <h4 id="traffic" className="card-title mb-0">
            Reports
          </h4>
          <div className="small text-medium-emphasis">
            Easily generate a report of your transactions
          </div>
        </CCol>
        <CCol sm={8} className="d-none d-md-flex button-group">
          <CDropdown className="reportBtn" variant="btn-group">
            <CDropdownToggle color="success">{selectedProject}</CDropdownToggle>
            <CDropdownMenu>
              {projectList.map((project, index) => (
                <CDropdownItem key={index} onClick={() => setProject(project)}>
                  {project}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CDropdown className="reportBtn" variant="btn-group">
            <CDropdownToggle color="success">{selectedGateway}</CDropdownToggle>
            <CDropdownMenu>
              {gatewayList.map((gateway, index) => (
                <CDropdownItem key={index} onClick={() => setGateway(gateway)}>
                  {gateway}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <DatePicker
            className="reportDate"
            placeholderText="From Date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            className="reportDate"
            placeholderText="To Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
          <CButton className="reportBtn" width={118} color="info" onClick={generateReport}>
            Generate report
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

ReportTableHeader.propTypes = {
  projects: PropTypes.array.isRequired,
  generateProjects: PropTypes.func.isRequired,
}
export default ReportTableHeader
