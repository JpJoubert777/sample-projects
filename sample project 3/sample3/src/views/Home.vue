<template>
  <div>
    <iframe 
      width="1140" 
      height="541.25" 
      :src= frame
      frameborder="0" 
      allowFullScreen="true">
    </iframe>
  </div>
  <label v-if="page1">Filter:</label>
  <select @change = "applyFilter" v-if="page1" v-model="filter">
    <option value="None">None</option>
    <option value="University of Pretoria">University of Pretoria</option>
    <option value="University of South Africa">University of South Africa</option>
    <option value="University of Johannesburg">University of Johannesburg</option>
    <option value="Boston College">Boston College</option>
    <option value="Microcert">Microcert</option>
  </select>
  <button @click = "openPage1">Page 1</button>
  <button @click = "openPage2">Page 2</button>

</template>

<script>

export default {
  data() {
    return {
      frame : 'https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection',
      filter : '',
      page1 : true,
      page2 : false,
    
    }
  },
  methods: {
    openPage1() {
      this.page1 = true;
      this.page2 = false;
      this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection";
    },
    openPage2() {
      this.page1 = false;
      this.page2 = true;
      this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSectionbb001ae8436d51663c40";
    },
    applyFilter() {
      if (this.filter == 'None') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection";
      else
      if (this.filter == 'University of Pretoria') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection&$filter=num_students_by_institution/institution_name eq 'University of Pretoria'";
      else
      if (this.filter == 'University of South Africa') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection&$filter=num_students_by_institution/institution_name eq 'University of South Africa'";
      else
      if (this.filter == 'University of Johannesburg') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection&$filter=num_students_by_institution/institution_name eq 'University of Johannesburg'";
      else
      if (this.filter == 'Boston College') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection&$filter=num_students_by_institution/institution_name eq 'Boston College'";
      else
      if (this.filter == 'Microcert') 
        this.frame = "https://app.powerbi.com/reportEmbed?reportId=d9540b6c-d359-4f5f-b736-a37eb63c0db8&autoAuth=true&ctid=980ebcd0-4d97-424f-9c8c-b506f698c330&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWFmcmljYS1ub3J0aC1hLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&pageName=ReportSection&$filter=num_students_by_institution/institution_name eq 'Microcert'";
      
    }

  }
}
</script>
