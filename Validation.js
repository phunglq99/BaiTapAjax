export default function Validation(){
    this.kiemTraRong = function (value,selectorError,name) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaSo = function  (value,selectorError,name)  {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải nhập số!';
        return false;
    }
    this.kiemTraTatCaKyTu = function (value,selectorError,name) {
        var regexLetter = /^[A-Z a-z]+$/;
        if(regexLetter.test(value)){//Chuỗi phù hợp định dạng
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' phải là chữ!';
        return false;
    }
    this.kiemTraGiaTri = function (value,selectorError,minValue,maxValue,name) {
        if(value < minValue || value > maxValue) {

            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} - ${maxValue} ký số`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGio = function (value,selectorError,minValue,maxValue,name) {
        if(value < minValue || value > maxValue) {

            document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} - ${maxValue} giờ`;
            return false;
        }

        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    
}