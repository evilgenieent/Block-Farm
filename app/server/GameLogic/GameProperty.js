import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.methods({
        'addUserLandConfiguration': function (s_Id, landsize) {
            var _landConfig = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.landConfig;
            if (landsize == 3) {
                difference = landsize * landsize;
            }
            else {
                difference = (landsize * landsize) - ((landsize - 1) * (landsize - 1));
            }
            var _id = _landConfig.length;
            if (!Number.isInteger(_id)) {
                _id = 0;
            }
            for (var i = 0; i < difference; i++) {
                _landConfig.id.push(_id);
                _landConfig.land.push(-1);
                _landConfig.crop.push(-1);
                _id++;
            }
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.landConfig': _landConfig } });
        },
        'updateUserLandConfiguration': function (s_Id, t_Id, cropId, landId, operation) {
            var _landConfig = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.landConfig;
            if (operation == 'land') {
                _landConfig.land[t_Id] = landId;
            }
            else {
                _landConfig.crop[t_Id] = cropId;
            }
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.landConfig': _landConfig } });
        },
        'moveUserLandPosition': function (s_Id, landsize) {
            var _landConfig = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.landConfig;
            length = landsize - 1;
            for (var i = ((length * length) - 1); i >= length; i--) {
                var complement = Math.floor((i / length));
                _landConfig.land[i + complement] = _landConfig.land[i];
                _landConfig.crop[i + complement] = _landConfig.crop[i];
                _landConfig.land[i] = -1;
                _landConfig.crop[i] = -1;
            }
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.landConfig': _landConfig } });
        },
        'addCropList': function (s_Id, _name, _img, _start, _end, _cropType, _ripe, _count) {
            var _cropList = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.cropList;
            var _id = _cropList.id.length;
            if (!Number.isInteger(_id)) {
                _id = 0;
            }
            _cropList.id.push(_id);
            _cropList.name.push(_name);
            _cropList.img.push(_img);
            _cropList.start.push(_start);
            _cropList.end.push(_end);
            _cropList.cropType.push(_cropType);
            _cropList.ripe.push(_ripe);
            _cropList.count.push(_count);
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.cropList': _cropList } });
        },
        'updateCropList': function (s_Id, t_Id, _name, _img, _start, _end, _cropType, _ripe, _count) {
            var _cropList = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id }).profile.game.cropList;
            _cropList.name[t_Id] = _name;
            _cropList.img[t_Id] = _img;
            _cropList.start[t_Id] = _start;
            _cropList.end[t_Id] = _end;
            _cropList.cropType[t_Id] = _cropType;
            _cropList.ripe[t_Id] = _ripe;
            _cropList.count[t_Id] = _count;
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.cropList': _cropList } });
        },
        'updateCropCount': function (s_Id, t_Id, _count) {
            var targetUser = Meteor.users.findOne({ 'profile.game.stakeholder.id': s_Id });
            var _cropList = targetUser.profile.game.cropList;
            _cropList.count[t_Id] = _count;
            Meteor.users.update({ 'profile.game.stakeholder.id': s_Id }, { $set: { 'profile.game.cropList': _cropList } });
        }
    });
}