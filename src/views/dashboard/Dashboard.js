import React, { useState } from 'react'

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
import ReportTable from '../../components/table/ReportTable'
import projects from './projects'

const Dashboard = () => {
  const [selectedProject, setProject] = useState('All projects')
  const [selectedGateway, setGateWay] = useState('All gateways')

  let projectList = ['All projects']
  projectList.push('abc')
  let gatewayList = ['All gateways']
  // let selectedProject = 'All projects'
  // let selectedGateway = 'All gateways'

  return (
    <>
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
          <CDropdown variant="btn-group">
            <CDropdownToggle color="success">{selectedProject}</CDropdownToggle>
            <CDropdownMenu>
              {projectList.map((project, index) => (
                <CDropdownItem key={index} onClick={() => setProject(project)}>
                  {project}
                </CDropdownItem>
              ))}
            </CDropdownMenu>
          </CDropdown>
          {selectedProject}
          {/* <CButton color="primary" className="float-end">
            <CIcon icon={cilCloudDownload} />
          </CButton>
          <CButtonGroup className="float-end me-3">
            {['Day', 'Month', 'Year'].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === 'Month'}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup> */}
        </CCol>
      </CRow>
      <CRow className="filteredReport">
        <CCol xs>
          <div className="filterText">All projects | All gateways</div>
          <ReportTable />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
