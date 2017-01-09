<?php

namespace Drupal\custom_espabila\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Controller routines for page example routes.
 */
class CustomEspabilaController extends ControllerBase {
  /**
   * A more complex _controller callback that takes arguments.
   *
   * This callback is mapped to the path
   * 'examples/page-example/arguments/{first}/{second}'.
   *
   * The arguments in brackets are passed to this callback from the page URL.
   * The placeholder names "first" and "second" can have any value but should
   * match the callback method variable names; i.e. $first and $second.
   *
   * This function also demonstrates a more complex render array in the returned
   * values. Instead of rendering the HTML with theme('item_list'), content is
   * left un-rendered, and the theme function name is set using #theme. This
   * content will now be rendered as late as possible, giving more parts of the
   * system a chance to change it if necessary.
   *
   * Consult @link http://drupal.org/node/930760 Render Arrays documentation
   * @endlink for details.
   *
   * @param string $first
   *   A string to use, should be a number.
   * @param string $second
   *   Another string to use, should be a number.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException
   *   If the parameters are invalid.
   */
  public function autocomplete() {
    $query = \Drupal::database()->select('search_api_db_propuestas_text', 'propuestas');
    $query->fields('propuestas', ['word']);
    //$query->condition('propuestas.word', $query->escapeLike($first) . '%', 'LIKE');
    $query->addExpression('SUM(score)', 'total');
    $query->groupBy('propuestas.word');
    $query->orderBy('total','DESC');
    $query->havingCondition('total',  2000, '>');

    $result = $query->execute()->fetchAllKeyed();


    $response = new Response();
    $response->setContent(json_encode(array_keys ($result)));
    $response->headers->set('Content-Type', 'application/json');
    return $response;
  }

}
