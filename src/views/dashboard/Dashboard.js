import React, { useState, useEffect } from 'react'
import ReportTable from 'src/components/table/ReportTable'
import ReportTableHeader from 'src/components/table/ReportTableHeader'
import projects from './projects'

const Dashboard = () => {
  const [selectedProject, setProject] = useState('Select project')
  const [selectedGateway, setGateway] = useState('Select gateways')
  const [tableData, setTableData] = useState([])

  const generateReport = (filterProject, filterGateway, startDate, endDate) => {
    // Filter reports
    let newProjects = []
    projects.forEach((project) => {
      if (filterProject === 'All projects' || project.name === filterProject) {
        // Add project to table
        if (filterGateway === 'All gateways') {
          let detailsList = []
          detailsList = project.data.filter((detail) => {
            return (
              (!startDate || new Date(startDate) <= new Date(detail.date)) &&
              (!endDate || new Date(endDate) >= new Date(detail.date))
            )
          })
          let newProject = { ...project }
          newProject.data = detailsList
          newProjects.push(newProject)
        } else {
          let detailsList = []
          detailsList = project.data.filter((detail) => {
            return (
              detail.gateway === filterGateway &&
              (!startDate || new Date(startDate) <= new Date(detail.date)) &&
              (!endDate || new Date(endDate) >= new Date(detail.date))
            )
          })
          let newProject = { ...project }
          newProject.data = detailsList
          newProjects.push(newProject)
        }
      }
    })
    setProject(filterProject)
    setGateway(filterGateway)
    setTableData(newProjects)
  }

  return (
    <>
      <ReportTableHeader projects={projects} generateProjects={generateReport} />
      <ReportTable
        projects={tableData}
        selectedProject={selectedProject}
        selectedGateway={selectedGateway}
      />
    </>
  )
}

export default Dashboard
