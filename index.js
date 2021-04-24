$(document).ready(() => {
  //alert("ready to use");
  tanggal();
  getApi();
  listProvinsi();
  getGlobals();
})
function tanggal() {
  let w = new Date();
  let bln = w.getMonth();
  let tgl = w.getDate();
  let bulan =
  [
    "Januari",
    "Febuari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  
  $('#bln').text(bulan[bln]);
  $('#tgl').text(tgl);
}

function getApi(){
  $.ajax({
    url: "https://covid.mathdro.id/api/countries/indonesia",
    success: function(result){
      $("#positif").text(formatNumber(result.confirmed.value));
      $("#sembuh").text(formatNumber(result.recovered.value));
      $("#meninggal").text(formatNumber(result.deaths.value));
      $("#upd").html('<i class="fas fa-calendar-check"></i> Update At : '+result.lastUpdate.split("T")[0]);
      console.log(result);
     }
  });
}
function getGlobals(){
  $.ajax({
    url: "https://covid.mathdro.id/api/",
    success: function(result){
      $("#gF").text(formatNumber(result.confirmed.value)+ " Orang Positif");
      $("#gS").text(formatNumber(result.recovered.value)+ " Orang Sembuh");
      $("#gM").text(formatNumber(result.deaths.value)+ " Orang Meninggal");
      
     }
  });
}

  
function formatNumber(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}


$("#cri").on("click",() => {
  $("#negara").focus();
  $("#fc").show();
});
$("#fc").hide();
 
function listProvinsi(){
  $.ajax({
    url: "https://indonesia-covid-19.mathdro.id/api/provinsi/",
    success: function(result){
      console.log(result);
      for (var i = 0; i < result.data.length; i++) {
      
        let li = document.createElement("option");
        let a = document.createElement("a");
        let txt = document.createTextNode(result.data[i].provinsi);
        
        li.setAttribute("value",i);
        li.appendChild(txt);
        ul.appendChild(li);
      }
      
     }
  });  
 }
 
 
 
 //logika carii
$("#btncari").on("click",() => {
  // body...
  cariNegara($("#negara").val());
  
 if ($("#negara").val() == 'indonesia') {
   $("#filter").show();
 }else {
   $("#filter").hide();
 }
});


//carii negara
function cariNegara(negara){
  $.ajax({
    url: "https://covid.mathdro.id/api/countries/"+negara,
    success: function(result){
      $("#positif").text(formatNumber(result.confirmed.value));
      $("#sembuh").text(formatNumber(result.recovered.value));
      $("#meninggal").text(formatNumber(result.deaths.value));
      $("#nation").text("DI "+ negara.toUpperCase());
      $("#upd").html('<i class="fas fa-calendar-check"></i> Update At : '+result.lastUpdate.split("T")[0]);
      console.log(result);
     }
  });
}

//logika filter
$("#ul").on("change",() => {
filterProv($(this).val());
});

//berdasarkan provinsi
function filterProv(prov){
  $.ajax({
    url: "https://indonesia-covid-19.mathdro.id/api/provinsi/",
    success: function(result){
      let data = result.data[prov];
      console.log(data);
      //$("#positif").text(formatNumber());
      $("#sembuh").text(formatNumber(result.recovered.value));
      $("#meninggal").text(formatNumber(result.deaths.value));
    }
  }); 
}
