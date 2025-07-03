const MyAccount = {
	template: `
<div class="container">
	<div class="row bg-white py-3">
		<div class="col-12">
			<p class="text-secondary text-uppercase mb-3"> Quản lý tài khoản </p>

			<div class="text-center">
				<img class="rounded-circle img-fluid" style="width: 5rem; height: 5rem;" :src="photoURL" @click="changeAvatar" />
			</div>
			
			<div class="">
				<v-input label="Full Name" v-model="newDisplayName" />
				<v-input label="Email" v-model="newEmail" type="email" />
				<v-input label="Phone" v-model="newPhoneNumber" type="tel" :readonly="'readonly'" />
			</div>
			
			<button class="btn btn-sm btn-primary mt-3 px-2" @click="update"> Save </button>
		</div>
	</div>
	
	<div class="row bg-white py-3 mt-5">
		<div class="col-12">
			<p class="text-secondary text-uppercase mb-3"> Đổi mật khẩu </p>
			<v-input label="New Password" v-model="newPassword" type="password" />
			
			<button class="btn btn-sm btn-primary mt-3 px-2" @click="changePass"> Change </button>
		</div>
	</div>
</div>
	`,
	data() {
		return {
			newDisplayName: "",
			newEmail: "",
			newPhoneNumber: "",
			photoURL: "",
			newPassword: ""
		}
	},
	watch: {
		"$root.user.displayName": function (newVal) {
			this.newDisplayName = newVal
		},
		"$root.user.email": function (newVal) {
			this.newEmail = newVal
		},
		"$root.user.phoneNumber": function (newVal) {
			this.newPhoneNumber = newVal
		},
		"$root.user.photoURL": function (url) {
			this.photoURL = url
		}
	},
	methods: {
		update() {
			var methods = {}
			var user = this.$root.user
			if (user == null)
				return 0;
			if (this.newDisplayName != user.displayName)
				methods.displayName = this.newDisplayName
			if (this.photoURL != user.photoURL)
				methods.photoURL = this.photoURL
			var change = false
			if (!my.isEmptyObject(methods))

auth.currentUser.updateProfile(methods)
.then(e => {
	notify("Hệ thống", "Cập nhật thành công", "success")
})
.catch(e => {
	notify("Hệ thống", e + "", "danger")
}), change = true
			 if (this.newEmail != user.email)
auth.currentUser.updateEmail(this.newEmail).then(e => {
	
})
.catch(e => {
	notify("Hệ thống", "Cập nhật thành công", "danger")
}), change = true
			 if (!change)
			 	notify("Hệ thống", "Bạn chưa thay đổi thông tin nào.")
		},
		changePass() {
			if ((this.newPassword + "").match(/\S/))
				auth.currentUser.updatePassword(this.newPassword)
.then(e => {
	notify("Hệ thống", "Mật khẩu của bạn đã được thay đổi.", "success")
})
.catch(e => {
	notify("Hệ thống", e + "", "danger")
})

		},
		changeAvatar() {
			var self = this
			Swal.fire({
				title: "",
				input: 'url',
				showCancelButton: false,
				confirmButtonText: 'Ok',
				showCloseButton: true
			})
			.then(e => {
			    this.photoURL = e.value
			})
		}
	},
	mounted() {
		var user = this.$root.user
		if (user != null) {
			this.newDisplayName = user.displayName
			 this.newEmail = user.email
			 this.newPhoneNumber = user.phoneNumber
			 this.photoURL = user.photoURL
		}
	},
	components: {
		"v-input": {
			template: `
<div class="v-input-group border p-1 px-2 rounded mt-3">
	<label class="small text-uppercase text-secondary v-input-label m-0 p-0">
		{{ label }}
	</label>
	<input class="border-0 d-block m-0 p-0 w-100" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" :type="type" :readonly="readonly" />
</div>
			`,
			inheritAttribute: true,
			props: ["label", "value", "placeholder", "type", "readonly"]
		}
	}
}
