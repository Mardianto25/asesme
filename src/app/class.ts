export class MasterClassModule {
    /// server

    public server="https://apidev.asesme.com/v1/";
  
    // Object
    public ambilData:any="";
    public hasilData:any="";
    public dataToken;
    public dataProfile;
    public idParams:any;
    public validasiLogin:any;
    public tahun=[];

    // Scrolly
    public noOfItemsToShowInitially: number = 3;
    public itemsToLoad: number = 3;
    public itemsToShow :any;
    public isFullListDisplayed: boolean = false;

    // Boolean
    public errorValidasi:boolean;

    // localStorage
    public profile:any;

    //Array
    public education=['SMK/SMA','D1','D2','D3','S1','S2','S3'];
    public position=["Android Developer","Front End Developer","Back End Developer", "Aplication Developer"]
    public location=["Bogor","Jakarta", "Surabaya","Bandung"];

    /// SLider Beranda
    public slideConfig = {
        dots: true,
        slidesToShow: 2, 
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1070,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    

      /// Slider DashBoard
      slideDashboard = {
        dots: true,
        slidesToShow: 3, 
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1070,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    
      slideMeme = {
        dots: true,
        slidesToShow: 2, 
        slidesToScroll: 1, 
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      getValidasi(param){
        if(param.code===200){
          
        }else{

        }
      }

} 