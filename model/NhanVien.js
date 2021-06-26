export default function NhanVien(maNV,tenNV,chucVu,heSoChucVu,luongCoBan,gioLamTrongThang){
    this.maNhanVien =maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = chucVu;
    this.heSoChucVu= heSoChucVu;
    this.luongCoBan = luongCoBan;
    this.soGioLamTrongThang = gioLamTrongThang;
    this.tongLuong = function(){
        var tinhtongluong = luongCoBan * heSoChucVu;
        return tinhtongluong;
    };
    this.xepLoai = function(){
        var output = '';
        if(gioLamTrongThang >= 120){
            output = 'Nhân Viên xuất sắc';
        }else if(gioLamTrongThang >= 100 || gioLamTrongThang < 120){
            output = 'Nhân Viên giỏi';
        }else if(gioLamTrongThang >= 80 || gioLamTrongThang < 100){
            output = 'Nhân Viên khá';
        }else if(gioLamTrongThang >= 50 || gioLamTrongThang < 80){
            output = 'Nhân Viên trung bình';
        }else{
            output = 'Không hợp lệ';
        }
        return output;
    };
    
    
}