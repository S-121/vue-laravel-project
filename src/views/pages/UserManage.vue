<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- DatatablesCRUDActions -->
  <!-- ----------------------------------------------------------------------------- -->
  <div>
    <BaseBreadcrumb
      :title="page.title"
      :icon="page.icon"
      :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="username"
        class="border"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on"
                  >New User</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      action="/pages/boxedlogin"
                    >
                      <v-text-field
                        v-model="input.username"
                        label="Full Name"
                        class="mt-4"
                        required
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="input.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="input.password"
                        :counter="6"
                        :rules="passwordRules"
                        label="Password"
                        required
                        outlined
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                      ></v-text-field>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.role="{ item }">
          <v-switch
            v-model="ex11"
            color="indigo darken-3"
            @click="rolemanage(item)"
            hide-details
          ></v-switch>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManage",

  data: () => ({
    valid: false,
    show1: false,
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be less than 6 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    page: {
      title: "User Manage",
    },
    elementVisible: false,
    breadcrumbs: [
      {
        text: "User manage table",
        disabled: true,
      },
    ],
    ex11: [],
    dialog: false,
    headers: [
      {
        text: "No",
        align: "start",
        sortable: false,
        value: "num",
      },
      { text: "User Name", value: "username" },
      { text: "E-mail", value: "email" },
      { text: "Role", value: "role", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    input: {
      username: "",
      email: "",
      password: "",
    },
    editedItem: {
      username: 0,
      email: 0,
      role: 0,
      protein: 0,
    },
    defaultItem: {
      username: 0,
      email: 0,
      role: 0,
      protein: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    currentUser() {
      return this.$store.getters["auth/getCurrentUser"];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.usergetdata();
  },

  methods: {
    usergetdata() {
      const that = this;
      console.log("this: ", this);
      var num = 0;
      const headers = {
        // Authorization: "Bearer " + this.currentUser.token,
        "My-Custom-Header": "foobar",
      };
      this.$http.get("api/usergetdata", { headers }).then(function (res) {
        for (let i = 0; i < res.data.admindatas.length; i++) {
          num++;
          res.data.admindatas[i]["num"] = num;
        }
        that.desserts = res.data.admindatas;
        console.log(that.desserts);
      });
    },

    editItem(item) {
      console.log(item);
      this.editedIndex = this.desserts.indexOf(item);
      this.input = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.$refs.form.validate();
      const that = this;
      if (this.$refs.form.validate(true)) {
        this.$http
          .post("api/usercreateorupgrade", this.input)
          .then(function (res) {
            if (res.data == "NEWUSERUPDATE") {
              that.close();
              that.usergetdata();
            }
          });
      }
    },
  },
};
</script>