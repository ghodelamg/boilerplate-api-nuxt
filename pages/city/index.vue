<template>
  <div>
    <v-tabs v-model="tab" class="mb-5" @change="refreshData()">
      <v-tab v-index="$getConst('CITY')" href="#tab1">
        <p class="mt-2">Listing</p>
      </v-tab>
      <v-tab v-importBulk="$getConst('CITY')" href="#tab2">
        <p class="mt-2">Import</p>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab1">
        <v-data-table
          ref="table"
          v-model="selected"
          v-index="$getConst('CITY')"
          :headers="headers"
          :items="tableData"
          :loading="loading"
          :options.sync="options"
          :items-per-page="limit"
          :footer-props="footerProps"
          :server-items-length="pageCount"
          class="elevation-1"
          :show-select="true"
          @update:options="onUpdateOptions"
        >
          <template v-slot:top>
            <v-layout>
              <v-flex xs12 sm12 md4 lg4>
                <v-text-field
                  v-model="searchModel"
                  label="Search"
                  class="mx-4"
                  prepend-inner-icon="mdi-magnify"
                  @input="onSearch"
                />
              </v-flex>
              <v-flex xs12 sm12 md8 lg8>
                <div class="float-right mt-4">
                  <v-menu
                    v-model="filterMenu"
                    :close-on-content-click="false"
                    :nudge-width="200"
                    offset-y
                  >
                    <template v-slot:activator="{ on: onMenu }">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on: onTooltip, attrs }">
                          <v-btn
                            class="mb-2 mr-2"
                            color="indigo"
                            dark
                            v-bind="attrs"
                            v-on="{ ...onMenu, ...onTooltip }"
                          >
                            <v-icon small> mdi-filter </v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $getConst("FILTER_TOOLTIP") }}</span>
                      </v-tooltip>
                    </template>
                    <v-card class="p-4">
                      <v-list>
                        <v-btn
                          text
                          class="float-right filter-close-btn"
                          @click="filterMenu = false"
                        >
                          <v-icon small> mdi-close </v-icon>
                        </v-btn>
                        <v-select
                          v-model="state_id"
                          name="state"
                          item-text="name"
                          item-value="id"
                          :items="setStateList"
                          label="State"
                        />
                      </v-list>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn color="primary" text @click="changeFilter()">
                          Apply Filter
                        </v-btn>
                        <v-btn text @click="resetFilter()">
                          Reset Filter
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-store="$getConst('CITY')"
                        color="primary"
                        dark
                        class="mb-2 mr-2"
                        v-on="on"
                        @click="addCity()"
                      >
                        <v-icon small> mdi-plus </v-icon>
                      </v-btn>
                    </template>
                    <span>Add City</span>
                  </v-tooltip>
                  <export-btn
                    ref="exportbtn"
                    v-export="$getConst('CITY')"
                    :export-props="exportProps"
                    @click.native="setExport()"
                  />
                  <template v-if="selected.length > 1">
                    <multi-delete
                      ref="multipleDeleteBtn"
                      v-deleteAll="$getConst('CITY')"
                      :delete-props="deleteProps"
                      @click.native="multipleDelete()"
                      @multiDelete="getData(), (selected = [])"
                    />
                  </template>
                </div>
              </v-flex>
            </v-layout>
          </template>
          <template v-slot:item.state_id="{ item }">
            <span v-if="item.state">{{ item.state.name }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  v-update="$getConst('CITY')"
                  small
                  class="mr-2"
                  v-on="on"
                  @click="editItem(item.id)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>{{ $getConst("EDIT_TOOLTIP") }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  v-destroy="$getConst('CITY')"
                  small
                  class="mr-2"
                  v-on="on"
                  @click="deleteItem(item.id)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>{{ $getConst("DELETE_TOOLTIP") }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item value="tab2">
        <v-card flat>
          <v-card-text>
            <import ref="importdata" :import-props="importProps" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <error-modal v-model="errorDialog" :error-arr="errorArr" />
    <add-city v-model="addCityModal" />
    <delete-modal
      v-model="modalOpen"
      :param-props="paramProps"
      :confirmation="confirmation"
    />
  </div>
</template>

<script src="./city.js"></script>