angular.module('memo',[])
.controller("MemoController",["$scope","$http",function ($scope,$http){
    $scope.tabChamps = [];
    $scope.nameCurrentCard = "";
    $http.get('./champions.json').then(function(response){
        $scope.champions = response.data.data;
        
        for (var i=0;i<3;i++){
            $scope.nbRandom = Math.floor((Math.random()*(Object.keys($scope.champions)).length));
            var nomChamp = Object.keys($scope.champions)[$scope.nbRandom];
            var champ0 = {};
            var champ1 = {};
            champ0.nom = nomChamp;
            champ0.img = nomChamp + "_0";
            champ1.nom = nomChamp;
            champ1.img = nomChamp + "_1";
            $scope.tabChamps.push(champ0);
            $scope.tabChamps.push(champ1);            
        }
        shuffle($scope.tabChamps);

       $scope.turnCard = function ($event){
                if(!$event.currentTarget.classList.contains('turned')){
                    switch (document.querySelectorAll('.turned').length){
                        case 0 :
                            $event.currentTarget.classList.add('turned');
                            $event.currentTarget.childNodes[1].childNodes[1].style.visibility="visible";
                            $event.currentTarget.childNodes[1].childNodes[3].style.visibility="visible";
                            $scope.nameCurrentCard = $event.currentTarget.childNodes[1].childNodes[3].textContent;
                            break;
                        case 1 :
                            if($scope.nameCurrentCard == $event.currentTarget.childNodes[1].childNodes[3].textContent){
                                $event.currentTarget.classList.add('validated');
                                $event.currentTarget.childNodes[1].childNodes[1].style.visibility="visible";
                                $event.currentTarget.childNodes[1].childNodes[3].style.visibility="visible";
                                document.querySelector('.turned').classList.replace('turned','validated');
                                if(document.querySelectorAll('.validated').length==$scope.tabChamps.length){
                                    alert('vous avez gagné !');
                                }
                                break;
                            }else{
                                $event.currentTarget.classList.add('turned');
                                $event.currentTarget.childNodes[1].childNodes[1].style.visibility="visible";
                                $event.currentTarget.childNodes[1].childNodes[3].style.visibility="visible";
                                $scope.nameCurrentCard = "";
                                break;
                            }
                            
                        default :
                            var turned = document.querySelectorAll('.turned');
                            var i;
                            for(i=0;i<turned.length;i++){
                                turned[i].classList.remove('turned');
                                turned[i].childNodes[1].childNodes[1].style.visibility="hidden";
                                turned[i].childNodes[1].childNodes[3].style.visibility="hidden";
                            }
                            $event.currentTarget.classList.add('turned');
                            $event.currentTarget.childNodes[1].childNodes[1].style.visibility="visible";
                            $event.currentTarget.childNodes[1].childNodes[3].style.visibility="visible";  
                            $scope.nameCurrentCard = $event.currentTarget.childNodes[1].childNodes[3].textContent;  
                            break;
                    }
                }
                
       };
    });

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    }

}]);