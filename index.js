
import NhanVien from "./model/NhanVien.js";
import Validation from "./Validation.js";

// load 100 data giống nhau
const seedNhanVien = () => {
    for (let i = 2 ; i <= 100 ; i++){
        var promise = axios({
            url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
            method:'POST',
            data: {
                maNhanVien: i,
                tenNhanVien: "Test",
                chucVu: "Giám đốc",
                heSoChucVu: 3,
                luongCoBan: 32,
                soGioLamTrongThang: 3213123
              } //Dữ liệu gửi đi đúng định dạng
        })
        promise.then(function(result){
            console.log('result', result.data);
            //load lại data
            getNhanVienApi();
        })
    
        promise.catch(function(error){
            console.log('error', error); 
        })
    
    }

}
// seedNhanVien();


// Hiển thị danh sách sinh viên
const getNhanVienApi = () => {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien`,
        method: 'GET',
        responseType: 'json'
    })

    promise.then(function (result) {
        console.log('result', result.data);
        renderTableNhanVien(result.data);
    })
    promise.catch(function (errors) {
        console.log('errors', errors);
    })
}
getNhanVienApi();

// Xóa Nhân Viên
const xoaNhanVien = (maNVClick) => {
    var promise = axios({
        url : `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNVClick}`,
        method: 'DELETE'
    })
    promise.then(function(result){
        console.log('result', result.data);
        //load lại data
        getNhanVienApi();
    })

    promise.catch(function(error){
        console.log('error', error.response.data); 
    })
}


const renderTableNhanVien = (arrNV) => {
    console.log("render", arrNV);
    var trNhanVien = `<tr>`;
    for (let nv of arrNV) {
        console.log('nv', nv);
        var nhanVien = new NhanVien(nv.maNhanVien, nv.tenNhanVien, nv.chucVu, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);  
        trNhanVien += `
        <td>${nhanVien.maNhanVien}</td>          
        <td>${nhanVien.tenNhanVien}</td>          
        <td>${nhanVien.chucVu}</td>          
        <td>${nhanVien.luongCoBan}</td>
        <td>${nhanVien.tongLuong()}</td>
        <td>${nhanVien.soGioLamTrongThang}</td>  
        <td>${nhanVien.xepLoai()}</td>
        <td style="display:flex"><button style ="font-size:14px" class="btn-${nhanVien.maNhanVien}-xoa btn btn-danger">Xóa</button>      
        <button style ="font-size:14px" class="btn-${nhanVien.maNhanVien}-sua btn btn-primary" >Chỉnh sửa</button>
        </td>  
        `;
        trNhanVien += `</tr>`;
        
    }
    document.querySelector('#tblNhanVien').innerHTML = trNhanVien;
    for(let nv of arrNV){
        document.querySelector(`.btn-${nv.maNhanVien}-xoa`).onclick = function(){
            xoaNhanVien(nv.maNhanVien);
        };
        document.querySelector(`.btn-${nv.maNhanVien}-sua`).onclick = function(){
            suaNhanVien(nv.maNhanVien);
        }
    }
}


// Thêm Nhân viên
document.querySelector('#btnThemNV').onclick = (e, index) =>{
    e.preventDefault();
    let validation = new Validation();
    let arrInput = document.querySelectorAll('form input,select');
    // console.log('arrInput',arrInput);
    var nhanVien = {};
    let heSoChucVu = 0;
    var vali = true;


        for(let input of arrInput){

            let {name ,value}  = input;

            if(name === "chucVu"){
                console.log("value", value);
                if(value === "1"){
                    heSoChucVu = Number(value);
                    value = 'Nhân viên';
                }else if(value === "2"){
                    heSoChucVu = Number(value);
                    value = 'Quản lý'
                }else if (value === "3"){
                    heSoChucVu = Number(value);
                    value = 'Giám đốc'
                }
            }
            // nhanVien.maNhanVien= Number(nhanVien.maNhanVien);
            // nhanVien.heSoChucVu= Number(nhanVien.heSoChucVu);
            // nhanVien.luongCoBan= Number(nhanVien.luongCoBan);
            // nhanVien.soGioLamTrongThang= Number(nhanVien.soGioLamTrongThang);
   
            nhanVien = {...nhanVien, heSoChucVu, [name] : value};
           
            console.log('nhanVien',nhanVien);               
        }
        //Kiểm tra rỗng
    vali &= validation.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien','Mã nhân viên') 
         & validation.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien','Tên nhân viên') 
         & validation.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoBan','Lương cơ bản') 
         & validation.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGioLam','Số giờ làm');

        //Kiểm tra là number
    vali &= validation.kiemTraTatCaSo(nhanVien.maNhanVien,'#error_allnumber_maNhanVien','Mã nhân viên')
         & validation.kiemTraTatCaSo(nhanVien.luongCoBan,'#error_allnumber_luongCoBan','Lương cơ bản')        
         & validation.kiemTraTatCaSo(nhanVien.soGioLamTrongThang,'#error_allnumber_soGioLam','Số giờ làm');    
        
         //Kiểm tra là letter
    vali &= validation.kiemTraTatCaKyTu(nhanVien.tenNhanVien,'#error_allletter_tenNhanVien','Tên nhân viên'),    
         
         //Kiểm tra giới hạn nhập
    vali &= validation.kiemTraGiaTri(nhanVien.maNhanVien,'#error_min_max_value_maNhanVien',4,6,'Mã nhân viên')
    vali &= validation.kiemTraGiaTri(nhanVien.luongCoBan,'#error_min_max_value_luongCoBan',1000000,6000000,'Lương cơ bản')     
    vali &= validation.kiemTraGio(nhanVien.soGioLamTrongThang,'#error_min_max_value_soGioLam',50,150,'Số giờ làm trong tháng') 
    
         if(!vali){
        return;
    }
        
    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien`,
        method:'POST',
        data:nhanVien //Dữ liệu gửi đi đúng định dạng
    })
    promise.then(function(result){
        console.log('result', result.data);
        //load lại data
        getNhanVienApi();
    });

    promise.catch(function(error){
        console.log('error', error); 
    });

};
// Sửa nhân viên
const suaNhanVien = (maNV) =>{
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNV}`,
        method: 'GET'
    });

    promise.then(function(result){
        console.log('result',result.data);
        
         let nhanVien = result.data;       
        let valueCV = nhanVien.chucVu;
        console.log('nhanVien',valueCV);
        if(valueCV === 'Nhân viên'){
            valueCV = 1;
        }else if(valueCV === 'Quản lý'){
            valueCV = 2;
        }else if(valueCV === 'Giám đốc'){
            valueCV = 3;
        }
        // Load dữ liệu 
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = valueCV,
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLam').value = nhanVien.soGioLamTrongThang;

    });
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
    document.querySelector('#btnLuuThongTin').disabled = false;
    document.querySelector('#maNhanVien').disabled = true;
    document.querySelector('#btnThemNV').disabled = true;
}
//Cập nhật nhân viên
    document.querySelector('#btnLuuThongTin').onclick = function(){
        let arrInput = document.querySelectorAll('form input,select');
        // console.log('arrInput',arrInput);
        var nhanVien = {};
        let heSoChucVu = 0;
    
        for(let input of arrInput){
    
            let {name ,value}  = input;
    
            if(name === "chucVu"){
                console.log("value", value);
                if(value === "1"){
                    heSoChucVu = Number(value);
                    value = 'Nhân viên';
                }else if(value === "2"){
                    heSoChucVu = Number(value);
                    value = 'Quản lý'
                }else if (value === "3"){
                    heSoChucVu = Number(value);
                    value = 'Giám đốc'
                }
            }
            // nhanVien = {...nhanVien, [name] : value}
            nhanVien = {...nhanVien,heSoChucVu, [name] : value};
            console.log('nhanVien',nhanVien);
        }
        var promise = axios({
            url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
            method:'PUT',
            data:nhanVien
        });
        promise.then(function(result) {
            console.log('result',result.data);
            //Gọi lại api lấy danh sách load lại dữ liệu mới
            getNhanVienApi();
        })
    
        promise.catch(function(error) {
            console.log(error.response.data)
        })
        document.querySelector('#btnLuuThongTin').disabled = true;
        document.querySelector('#maNhanVien').disabled = false;
        document.querySelector('#btnThemNV').disabled = false;
    }


     


