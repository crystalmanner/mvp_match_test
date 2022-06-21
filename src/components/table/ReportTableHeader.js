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
import axios from 'axios'

const ReportTableHeader = (props) => {
  const [selectedProject, setProject] = useState({ id: -1, name: 'Select project' })
  const [selectedGateway, setGateway] = useState({ id: -1, name: 'Select gateways' })
  const [projectList, setProjectList] = useState([])
  const [gatewayList, setGatewayList] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const baseURL = 'http://178.63.13.157:8090/mock-api/api/'
  const getAllProjectList = () => {
    axios
      .get(`${baseURL}projects`)
      .then((response) => {
        setProjectList(response.data.data)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  const getAllGatewayList = () => {
    axios
      .get(`${baseURL}gateways`)
      .then((response) => {
        setGatewayList(response.data.data)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }
  useEffect(() => {
    getAllProjectList()
    getAllGatewayList()
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
            <CDropdownToggle color="success">{selectedProject.name}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => setProject({ id: 0, name: 'All projects' })}>
                All projects
              </CDropdownItem>
              {projectList.map((project, index) => (
                <CDropdownItem
                  key={index}
                  onClick={() => setProject({ id: project.projectId, name: project.name })}
                >
                  {project.name}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          <CDropdown className="reportBtn" variant="btn-group">
            <CDropdownToggle color="success">{selectedGateway.name}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => setGateway({ id: 0, name: 'All gateways' })}>
                All gateways
              </CDropdownItem>
              {gatewayList.map((gateway, index) => (
                <CDropdownItem
                  key={index}
                  onClick={() => setGateway({ id: gateway.gatewayId, name: gateway.name })}
                >
                  {gateway.name}
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
