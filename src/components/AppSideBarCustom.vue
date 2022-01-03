<template>
<CSidebar  visible>
    <CSidebarBrand>Panel</CSidebarBrand>
    <CSidebarNav>
      <CNavItem href="#/">
        <CIcon  customClassName="nav-icon" icon="cil-speedometer" />Dashboard
      </CNavItem>
      <CNavItem href="#/projects">
        <CIcon customClassName="nav-icon" icon="cil-speedometer" />Projects
        <CBadge color="primary ms-auto">NEW</CBadge>
      </CNavItem>
      <CNavItem href="#/cities">
        <CIcon customClassName="nav-icon" icon="cil-speedometer" />Cities
        <!-- <CBadge color="primary ms-auto">NEW</CBadge> -->
      </CNavItem>
      <li class="nav-title">Users</li>
      <CNavGroup>
        <template #togglerContent>
          <CIcon customClassName="nav-icon" icon="cil-user" />Users
        </template>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon="cil-user" />Resume
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon="cil-user-follow" />Create User
        </CNavItem>
      </CNavGroup>
      <li class="nav-title">Visitors</li>
      <CNavGroup>
        <template #togglerContent>
          <CIcon customClassName="nav-icon" icon="cil-puzzle" />Visitors
        </template>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon="cil-list" />List Visitors
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon="cil-calendar" />Create Time for Visitors
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon="cil-av-timer" />Time Visitors
        </CNavItem>
      </CNavGroup>
      <li class="nav-title">Reports</li>
       <CNavItem href="#">
        <CIcon customClassName="nav-icon" icon="cil-speech" />Reports
      </CNavItem>
      <li class="nav-title">Financial</li>
       <CNavItem href="#">
        <CIcon customClassName="nav-icon" icon="cil-speedometer" />Financial
      </CNavItem>
      <li class="nav-title">Emails</li>
       <CNavItem href="#">
        <CIcon customClassName="nav-icon" icon="cil-speedometer" />Emails
      </CNavItem>
    </CSidebarNav>
    <!-- <CSidebarToggler /> -->
  </CSidebar>
</template>

<script>

export default {
  name: 'AppSidebarCustom',
  components: {
  },
}
</script>