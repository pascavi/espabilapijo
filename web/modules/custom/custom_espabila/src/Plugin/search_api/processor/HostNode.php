<?php

namespace Drupal\custom_espabila\Plugin\search_api\processor;

use Drupal\search_api\Item\FieldInterface;
use Drupal\search_api\Plugin\search_api\data_type\value\TextValueInterface;
use Drupal\search_api\Processor\FieldsProcessorPluginBase;

/**
 * Adds the item's URL to the indexed data.
 *
 * @SearchApiProcessor(
 *   id = "custom",
 *   label = @Translation("Custom Espabila Pijo"),
 *   description = @Translation("Custom"),
 *   stages = {
 *     "pre_index_save" = -40,
 *     "preprocess_index" = -40,
 *     "preprocess_query" = -40
 *   },
 * )
 */
//locked = true,
//
//

class HostNode extends FieldsProcessorPluginBase {

  protected $synonims = array(
    'bici' => 'bicicleta',
    'bicis' => 'bicicleta',
    'bicicletas' => 'bicicleta',
    'bús' => 'autobús',
    'autobuses' => 'autobús',
    'culturales' => 'cultura',
    'cultural' => 'cultura',
    'espacio' => 'espacios'
  );

  /**
   * {@inheritdoc}
   */
  protected function process(&$value) {
    $synonim = isset($this->synonims[$value]) ? $this->synonims[$value] : '';
    if(empty($synonim) || !is_string($value)){
      return;
    }
    $value  = $synonim;

    //dsm($value);
  }
}

/*
  public function addFieldValues(ItemInterface $item) {

    $url = 'test';//$item->getDatasource()->getItemUrl($item->getOriginalObject());
    //if ($url) {
      $fields = $this->getFieldsHelper()
        ->filterForPropertyPath($item->getFields(), NULL, 'host_node_title');
      foreach ($fields as $field) {
       // if (!$field->getDatasourceId()) {
          $field->addValue($url);
          dsm($url);
       // }
      }
      //dpm($fields);
    //}
  }


  public function preprocessIndexItems(array $items) {
    foreach ($items as $item) {
     // dpm($item->getFields());

      // We will add always this custom field, with random value.
      foreach ($this->getFieldsHelper()->filterForPropertyPath($item->getFields(), 'entity:field_collection_item', 'field_tema') as $always_added_field){
        //dpm($always_added_field);
        $always_added_field->setValues(['test']);
          //->addValue('test');
      }

    }
  }

  public function alterIndexedItems(array &$items){
    foreach ($items as $item) {
     // dpm($item);
      foreach ($this->getFieldsHelper()
                 ->filterForPropertyPath($item->getFields(), 'entity:field_collection_item', 'field_tema') as $always_added_field) {
        //dpm('test*');
        $always_added_field->addValue('test');
      }
    }
  }

  public function preIndexSave(){
    dpm('test1');
  }
*/

//from .module
/*
function search_api_host_node_search_api_views_field_handler_mapping_alter(array &$mapping) {
  $mapping['host_node_title'] = array(
    'id' => 'host_node_title',
    'fallback_handler' => 'host_node',

  );
  dsm($mapping);
}
*/

//http://cclub.cf/article/writing-custom-drupal-search-api-processor
//https://www.drupal.org/node/2715959
//web/modules/contrib/search_api/src/Plugin/search_api/processor/AddURL.php