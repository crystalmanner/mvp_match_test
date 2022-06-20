import React, { useState, useEffect } from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import ReportTable from 'src/components/table/ReportTable'
import projects from './projects'

const Dashboard = () => {
  const [selectedProject, setProject] = useState('Select project')
  const [selectedGateway, setGateway] = useState('Select gateways')
  const [projectList, setProjectList] = useState(['All projects'])
  const [gatewayList, setGatewayList] = useState(['All gateways'])
  const [tableData, setTableData] = useState(projects)
  const [testVal, setTestVal] = useState('begin')

  useEffect(() => {
    // Get Available Product List
    let newProjectList = ['All projects']
    let newGatewayList = ['All gateways']
    projects.map((project) => {
      newProjectList.push(project.name)
      project.data.map((detail) => {
        if (!newGatewayList.includes(detail.gateway)) {
          newGatewayList.push(detail.gateway)
        }
      })
    })
    setProjectList(newProjectList)
    setGatewayList(newGatewayList)
    generateReport()
  }, [projects])

  function generateReport() {
    let newProjects = []
    projects.map((project) => {
      if (selectedProject === 'All projects' || project.name === selectedProject) {
        // Add project to table
        if (selectedGateway === 'All gateways') {
          newProjects.push(project)
        } else {
          let detailsList = []
          detailsList = project.data.filter((detail) => {
            return detail.gateway === selectedGateway
          })
          let newProject = { ...project }
          newProject.data = detailsList
          newProjects.push(newProject)
        }
      }
    })
    console.log(newProjects, 'newProjects')
    setTableData(newProjects)
  }
  // function changeProject(project) {
  //   setProject(project)
  //   generateReport()
  // }
  // function changeGateway(gateway) {
  //   setGateway(gateway)
  //   generateReport()
  // }

  const testFunc = (val) => {
    console.log(val, 'val')
    setTestVal(val)
  }

  return (
    <>
      <h1>{testVal}</h1>
      <CRow>
        <CCol sm={5} className="pageHeader">
          <h4 id="traffic" className="card-title mb-0">
            Reports
          </h4>
          <div className="small text-medium-emphasis">
            Easily generate a report of your transactions
          </div>
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
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
          <CButton className="reportBtn" width={118} color="info" onClick={generateReport}>
            Generate report
          </CButton>
        </CCol>
      </CRow>
      <ReportTable
        projects={tableData}
        selectedProject={selectedProject}
        selectedGateway={selectedGateway}
        childTestFunc={testFunc}
      />
    </>
  )
}

export default Dashboard
